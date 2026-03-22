import Kernel from '@onkernel/sdk';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration: number;
  replayUrl?: string;
  screenshotUrl?: string;
}

export interface BrowserSession {
  sessionId: string;
  liveViewUrl: string;
  replayId?: string;
}

export class KernelTestRunner {
  private kernel: Kernel;
  private resultsDir: string;

  constructor(apiKey?: string) {
    this.kernel = new Kernel({ apiKey });
    this.resultsDir = join(process.cwd(), 'e2e', 'test-results', 'failures');
  }

  async createBrowser(options?: { headless?: boolean }): Promise<BrowserSession> {
    const browser = await this.kernel.browsers.create({
      headless: options?.headless ?? true,
      timeout_seconds: 300,
    });

    return {
      sessionId: browser.session_id,
      liveViewUrl: browser.browser_live_view_url ?? '',
    };
  }

  async startRecording(sessionId: string): Promise<string> {
    const replay = await this.kernel.browsers.replays.start(sessionId);
    return replay.replay_id;
  }

  async stopRecording(sessionId: string, replayId: string): Promise<void> {
    await this.kernel.browsers.replays.stop(replayId, { id: sessionId });
  }

  async executeTest(
    sessionId: string,
    testName: string,
    code: string,
    timeoutSec = 120
  ): Promise<{ success: boolean; result?: unknown; error?: string; stderr?: string }> {
    try {
      const response = await this.kernel.browsers.playwright.execute(sessionId, {
        code,
        timeout_sec: timeoutSec,
      });

      return {
        success: response.success,
        result: response.result,
        error: response.error,
        stderr: response.stderr,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  async saveReplayVideo(sessionId: string, replayId: string, testName: string): Promise<string> {
    await mkdir(this.resultsDir, { recursive: true });

    const videoData = await this.kernel.browsers.replays.download(replayId, { id: sessionId });
    const content = await videoData.blob();
    const buffer = Buffer.from(await content.arrayBuffer());

    const filename = `${testName.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.mp4`;
    const filepath = join(this.resultsDir, filename);

    await writeFile(filepath, buffer);
    return filepath;
  }

  async closeBrowser(sessionId: string): Promise<void> {
    try {
      await this.kernel.browsers.deleteByID(sessionId);
    } catch {
      // Ignore cleanup errors
    }
  }

  async runTestWithRecording(
    testName: string,
    testCode: string,
    options?: { headless?: boolean; timeoutSec?: number }
  ): Promise<TestResult> {
    const startTime = Date.now();
    let session: BrowserSession | null = null;
    let replayId: string | null = null;

    try {
      session = await this.createBrowser(options);
      replayId = await this.startRecording(session.sessionId);

      if (process.env.DEBUG === 'true') {
        console.log(`  Live view: ${session.liveViewUrl}`);
      }

      const result = await this.executeTest(
        session.sessionId,
        testName,
        testCode,
        options?.timeoutSec
      );

      if (replayId) {
        await this.stopRecording(session.sessionId, replayId);
      }

      const duration = Date.now() - startTime;

      if (!result.success) {
        if (replayId && session) {
          const videoPath = await this.saveReplayVideo(session.sessionId, replayId, testName);
          console.log(`  Video saved: ${videoPath}`);
        }

        return {
          name: testName,
          passed: false,
          error: result.error || result.stderr || 'Test failed',
          duration,
        };
      }

      return {
        name: testName,
        passed: true,
        duration,
      };
    } catch (err) {
      const duration = Date.now() - startTime;

      return {
        name: testName,
        passed: false,
        error: err instanceof Error ? err.message : String(err),
        duration,
      };
    } finally {
      if (session) {
        await this.closeBrowser(session.sessionId);
      }
    }
  }
}

export function generateTestCode(
  baseUrl: string,
  testFn: string
): string {
  return `
    const baseUrl = '${baseUrl}';
    
    ${testFn}
    
    await runTest(page, baseUrl);
  `;
}
