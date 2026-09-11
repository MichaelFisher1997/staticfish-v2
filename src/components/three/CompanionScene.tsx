import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface BurstState {
  id: number;
  time: number;
  origin: THREE.Vector3;
}

const easeOutCubic = (value: number): number => 1 - Math.pow(1 - value, 3);

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);

    scene.environment = target.texture;
    scene.environmentIntensity = 0.7;
    invalidate();

    return () => {
      scene.environment = null;
      target.dispose();
      generator.dispose();
      room.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [gl, scene, invalidate]);

  return null;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  seed: number;
  spin: number;
}

const BURST_PARTICLES = 56;

function Sparks({
  burst,
  reduced,
}: {
  burst: RefObject<BurstState>;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lastBurst = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pool = useMemo<Particle[]>(
    () =>
      Array.from({ length: BURST_PARTICLES }, () => ({
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 1,
        size: 0.03,
        seed: 0,
        spin: 0,
      })),
    [],
  );

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 8, 6), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#2f2fe4"),
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    if (reduced) return;
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    if (burst.current && burst.current.id !== lastBurst.current) {
      lastBurst.current = burst.current.id;
      const origin = burst.current.origin;
      let spawned = 0;
      for (let i = 0; i < pool.length && spawned < pool.length * 0.75; i += 1) {
        const particle = pool[i];
        if (particle.life > 0) continue;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = 2 + Math.random() * 2.6;
        const offset = 0.15 + Math.random() * 0.5;
        particle.x = origin.x + (Math.random() - 0.5) * offset;
        particle.y = origin.y + (Math.random() - 0.5) * offset;
        particle.z = origin.z + (Math.random() - 0.5) * offset;
        particle.vx = Math.sin(phi) * Math.cos(theta) * speed;
        particle.vy = Math.cos(phi) * speed * 0.75 + 0.6;
        particle.vz = Math.sin(phi) * Math.sin(theta) * speed * 0.6;
        particle.maxLife = 0.7 + Math.random() * 0.7;
        particle.life = particle.maxLife;
        particle.size = 0.02 + Math.random() * 0.05;
        particle.seed = Math.random() * Math.PI * 2;
        particle.spin = (Math.random() - 0.5) * 4;
        spawned += 1;
      }
    }

    const mesh = meshRef.current;
    if (mesh) {
      for (let i = 0; i < pool.length; i += 1) {
        const particle = pool[i];
        if (particle.life > 0) {
          particle.life -= dt;
          particle.x += particle.vx * dt;
          particle.y += particle.vy * dt;
          particle.z += particle.vz * dt;
          particle.vx *= 1 - 2.4 * dt;
          particle.vz *= 1 - 2.4 * dt;
          particle.vy = particle.vy * (1 - 1.6 * dt) + 1.1 * dt;
        }
        const ratio = Math.max(0, particle.life / particle.maxLife);
        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.rotation.set(0, 0, time * particle.spin + particle.seed);
        dummy.scale.setScalar(particle.size * ratio * 1.15);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, BURST_PARTICLES]}
      frustumCulled={false}
    />
  );
}

function Shockwave({
  burst,
  reduced,
}: {
  burst: RefObject<BurstState>;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastBurst = useRef(0);
  const active = useRef(false);
  const started = useRef(0);

  const geometry = useMemo(() => new THREE.RingGeometry(0.5, 0.545, 96), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#2f2fe4"),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    if (reduced) return;
    const mesh = meshRef.current;
    if (!mesh) return;

    if (burst.current && burst.current.id !== lastBurst.current) {
      lastBurst.current = burst.current.id;
      active.current = true;
      started.current = state.clock.elapsedTime;
      mesh.position.copy(burst.current.origin);
      mesh.position.z += 0.9;
    }

    if (!active.current) return;

    const progress = (state.clock.elapsedTime - started.current) / 0.55;
    if (progress >= 1) {
      active.current = false;
      mesh.visible = false;
      material.opacity = 0;
      return;
    }

    mesh.visible = true;
    const eased = easeOutCubic(progress);
    mesh.scale.setScalar(0.3 + eased * 1.7);
    material.opacity = (1 - progress) * 0.7;
    mesh.quaternion.copy(state.camera.quaternion);
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} visible={false} />;
}

interface Waypoint {
  p: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  yaw: number;
  pitch: number;
}

const WAYPOINTS: Waypoint[] = [
  { p: 0.0, x: 1.7, y: 0.05, z: 0, scale: 1, yaw: -0.55, pitch: 0.06 },
  { p: 0.13, x: 3.0, y: -2.75, z: -0.6, scale: 0.7, yaw: -0.1, pitch: -0.15 },
  { p: 0.28, x: -3.0, y: -2.8, z: -0.6, scale: 0.7, yaw: 0.4, pitch: -0.15 },
  { p: 0.44, x: 2.6, y: -2.75, z: -0.6, scale: 0.68, yaw: 0.9, pitch: -0.15 },
  { p: 0.57, x: 2.8, y: -2.8, z: -0.6, scale: 0.65, yaw: 1.3, pitch: -0.2 },
  { p: 0.68, x: 1.6, y: -3.0, z: -0.6, scale: 0.62, yaw: 1.6, pitch: -0.3 },
  { p: 0.8, x: 0.8, y: -3.5, z: -0.6, scale: 0.58, yaw: 1.9, pitch: -0.4 },
  { p: 0.9, x: 0.4, y: -3.8, z: -0.6, scale: 0.55, yaw: 2.1, pitch: -0.4 },
  { p: 1.0, x: 0.2, y: -4.0, z: -0.6, scale: 0.52, yaw: 2.3, pitch: -0.35 },
];

function sampleWaypoints(progress: number): Waypoint {
  if (progress <= WAYPOINTS[0].p) return WAYPOINTS[0];
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  if (progress >= last.p) return last;

  for (let i = 0; i < WAYPOINTS.length - 1; i += 1) {
    const from = WAYPOINTS[i];
    const to = WAYPOINTS[i + 1];
    if (progress >= from.p && progress <= to.p) {
      const span = Math.max(0.0001, to.p - from.p);
      const t = THREE.MathUtils.smoothstep((progress - from.p) / span, 0, 1);
      return {
        p: progress,
        x: THREE.MathUtils.lerp(from.x, to.x, t),
        y: THREE.MathUtils.lerp(from.y, to.y, t),
        z: THREE.MathUtils.lerp(from.z, to.z, t),
        scale: THREE.MathUtils.lerp(from.scale, to.scale, t),
        yaw: THREE.MathUtils.lerp(from.yaw, to.yaw, t),
        pitch: THREE.MathUtils.lerp(from.pitch, to.pitch, t),
      };
    }
  }

  return last;
}

const MODEL_URL = "/models/fish.glb";
const MODEL_YAW_OFFSET = Math.PI * 0.5;
const MODEL_TARGET_SIZE = 3.3;

function measureBounds(root: THREE.Object3D): THREE.Box3 {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3();
  const temp = new THREE.Box3();

  root.traverse((child) => {
    if (child instanceof THREE.SkinnedMesh) {
      child.computeBoundingBox();
      if (child.boundingBox) {
        temp.copy(child.boundingBox).applyMatrix4(child.matrixWorld);
        box.union(temp);
      }
    } else if (child instanceof THREE.Mesh) {
      child.geometry.computeBoundingBox();
      if (child.geometry.boundingBox) {
        temp.copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld);
        box.union(temp);
      }
    }
  });

  return box;
}

function FishModel({ reduced }: { reduced: boolean }) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const model = useMemo(() => {
    const scene = cloneSkinned(gltf.scene);

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.frustumCulled = false;
      const source = Array.isArray(child.material)
        ? child.material
        : [child.material];
      const recolored = source.map((material) => {
        const cloned = material.clone();
        if (cloned instanceof THREE.MeshStandardMaterial) {
          if (cloned.name === "Top") {
            cloned.color.set("#162e93");
          } else if (cloned.name === "Bottom") {
            cloned.color.set("#8d90e0");
          } else {
            cloned.color.set("#2f2fe4");
          }
          cloned.metalness = 0.1;
          cloned.roughness = 0.5;
          cloned.emissive = new THREE.Color("#0a0a35");
          cloned.emissiveIntensity = 0.3;
          cloned.envMapIntensity = 0.6;
          cloned.transparent = false;
          cloned.opacity = 1;
          cloned.depthWrite = true;
          cloned.depthTest = true;
        }
        return cloned;
      });
      child.material = Array.isArray(child.material) ? recolored : recolored[0];
    });

    const bounds = measureBounds(scene);
    const size = bounds.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z) || 1;
    const scale = MODEL_TARGET_SIZE / maxSize;

    const center = bounds.getCenter(new THREE.Vector3());
    scene.scale.setScalar(scale);
    scene.position.copy(center).multiplyScalar(-scale);

    return scene;
  }, [gltf]);

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[0];
    if (clip) {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }
    mixerRef.current = mixer;
    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, [gltf, model]);

  useFrame((state, delta) => {
    if (reduced) return;
    mixerRef.current?.update(Math.min(delta, 0.05) * 1.15);
  });

  return (
    <group rotation={[0, MODEL_YAW_OFFSET, 0]}>
      <primitive object={model} />
    </group>
  );
}

function Swimmer({
  burst,
  pointer,
  reduced,
}: {
  burst: RefObject<BurstState>;
  pointer: RefObject<THREE.Vector2>;
  reduced: boolean;
}) {
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const raycaster = useThree((state) => state.raycaster);

  const rootRef = useRef<THREE.Group>(null);
  const aimRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const pendingBurst = useRef(false);
  const spinStart = useRef(-10);

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, [data-no-burst]")) {
        return;
      }
      const group = aimRef.current;
      if (!group) return;
      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.intersectObject(group, true).length > 0) {
        pendingBurst.current = true;
      }
    },
    [camera, gl, raycaster],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const group = aimRef.current;
      if (!group) return;
      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const hovering = raycaster.intersectObject(group, true).length > 0;
      gl.domElement.style.cursor = hovering ? "pointer" : "";
    },
    [camera, gl, raycaster],
  );

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerDown, handlePointerMove]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = reduced ? 0 : state.clock.elapsedTime;
    const p = pointer.current;

    if (pendingBurst.current) {
      pendingBurst.current = false;
      if (burst.current) {
        burst.current.id += 1;
        burst.current.time = state.clock.elapsedTime;
        rootRef.current?.getWorldPosition(burst.current.origin);
      }
      spinStart.current = state.clock.elapsedTime;
    }

    const spinProgress = THREE.MathUtils.clamp(
      (state.clock.elapsedTime - spinStart.current) / 0.9,
      0,
      1,
    );
    const spin = reduced ? 0 : Math.PI * 2 * (1 - easeOutCubic(spinProgress));
    const pulse =
      1 + Math.sin(spinProgress * Math.PI) * 0.08 * (spinProgress < 1 ? 1 : 0);

    const doc = document.documentElement;
    const scrollMax = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = reduced
      ? 0
      : THREE.MathUtils.clamp(window.scrollY / scrollMax, 0, 1);
    const waypoint = sampleWaypoints(progress);

    const size = state.size;
    const aspect = size.width / Math.max(1, size.height);
    const compact = size.width < 768 || aspect < 1.15;
    const mid = !compact && (size.width < 1200 || aspect < 1.3);
    const fadeToEdge = compact
      ? THREE.MathUtils.clamp(1 - (progress - 0.08) / 0.12, 0, 1)
      : 1;

    const root = rootRef.current;
    if (root) {
      let targetX: number;
      let targetY: number;
      let targetZ: number;
      let targetScale: number;

      if (compact) {
        targetX = 0.72 + p.x * 0.12;
        targetY = -2.4 + Math.sin(time * 0.8) * 0.04;
        targetZ = -0.3;
        targetScale = 0.44 * fadeToEdge * pulse;
      } else if (mid) {
        targetX = waypoint.x * 0.9 + p.x * 0.2;
        targetY = waypoint.y + Math.sin(time * 0.8) * 0.05 + p.y * 0.12;
        targetZ = waypoint.z;
        targetScale = waypoint.scale * 0.62 * pulse;
      } else {
        targetX = waypoint.x + p.x * 0.32;
        targetY = waypoint.y + Math.sin(time * 0.8) * 0.06 + p.y * 0.16;
        targetZ = waypoint.z;
        targetScale = waypoint.scale * pulse;
      }

      root.position.x = THREE.MathUtils.damp(root.position.x, targetX, 3.2, dt);
      root.position.y = THREE.MathUtils.damp(root.position.y, targetY, 3.2, dt);
      root.position.z = THREE.MathUtils.damp(root.position.z, targetZ, 3.2, dt);
      root.scale.setScalar(THREE.MathUtils.damp(root.scale.x, targetScale, 4, dt));
    }

    const aim = aimRef.current;
    if (aim) {
      aim.rotation.y = THREE.MathUtils.damp(
        aim.rotation.y,
        waypoint.yaw + Math.sin(time * 0.35) * 0.06 + p.x * 0.28,
        3.5,
        dt,
      );
      aim.rotation.x = THREE.MathUtils.damp(
        aim.rotation.x,
        waypoint.pitch + Math.sin(time * 0.45) * 0.04 - p.y * 0.16,
        3.5,
        dt,
      );
      aim.rotation.z = THREE.MathUtils.damp(
        aim.rotation.z,
        Math.sin(time * 0.3) * 0.05 + p.x * 0.08,
        3.5,
        dt,
      );
    }

    if (spinRef.current) {
      spinRef.current.rotation.y = spin;
    }
  });

  return (
    <group ref={rootRef} position={[0, 0.05, 0]}>
      <group ref={aimRef} rotation={[0.06, -0.55, 0]}>
        <group ref={spinRef}>
          <Suspense fallback={null}>
            <FishModel reduced={reduced} />
          </Suspense>
        </group>
      </group>
    </group>
  );
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function CompanionScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const burst = useRef<BurstState>({
    id: 0,
    time: -1000,
    origin: new THREE.Vector3(),
  });

  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.current.set(x, y);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <CanvasErrorBoundary>
        <Canvas
          className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          dpr={[1, 1.5]}
          frameloop={reduced ? "demand" : "always"}
          camera={{ position: [0, 0, 7], fov: 40, near: 0.1, far: 60 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            setReady(true);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <StudioEnvironment />
          <ambientLight intensity={0.3} />
          <directionalLight position={[4, 6, 4]} intensity={0.85} color="#e8e9fd" />
          <pointLight position={[-4.5, 2.4, -2.5]} intensity={18} color="#a9abee" />
          <pointLight position={[3.5, -2.2, 2.5]} intensity={12} color="#d5d6fb" />
          <pointLight position={[1.5, 2.6, 4.5]} intensity={10} color="#e8e9fd" />

          <Swimmer burst={burst} pointer={pointer} reduced={reduced} />
          {!reduced && <Sparks burst={burst} reduced={reduced} />}
          {!reduced && <Shockwave burst={burst} reduced={reduced} />}
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
