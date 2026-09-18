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
        color: new THREE.Color("#a9abee"),
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
          cloned.emissive = new THREE.Color("#03122e");
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
    if (reduced) return;
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.style.cursor = "";
    };
  }, [gl, reduced, handlePointerDown, handlePointerMove]);

  useFrame((state, delta) => {
    const dt = reduced ? 1 : Math.min(delta, 0.05);
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

    const root = rootRef.current;
    if (root) {
      const targetX = reduced ? 0 : p.x * 0.08;
      const targetY = reduced ? 0 : Math.sin(time * 0.8) * 0.04;
      const targetScale = Math.min(1.15, state.viewport.width / 4.2) * pulse;

      if (reduced) {
        root.position.set(0, 0, 0);
        root.scale.setScalar(targetScale);
      } else {
        root.position.x = THREE.MathUtils.damp(root.position.x, targetX, 3.2, dt);
        root.position.y = THREE.MathUtils.damp(root.position.y, targetY, 3.2, dt);
        root.scale.setScalar(targetScale);
      }
    }

    const aim = aimRef.current;
    if (aim && reduced) {
      aim.rotation.set(0.06, -0.55, 0);
    } else if (aim) {
      aim.rotation.y = THREE.MathUtils.damp(
        aim.rotation.y,
        -0.55 + Math.sin(time * 0.35) * 0.04 + p.x * 0.1,
        3.5,
        dt,
      );
      aim.rotation.x = THREE.MathUtils.damp(
        aim.rotation.x,
        0.06 + Math.sin(time * 0.45) * 0.02 - p.y * 0.06,
        3.5,
        dt,
      );
      aim.rotation.z = THREE.MathUtils.damp(
        aim.rotation.z,
        Math.sin(time * 0.3) * 0.02,
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
    const wrapper = wrapperRef.current;
    if (!wrapper || reduced) return;
    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.current.set(x, y);
    };
    const onPointerLeave = () => pointer.current.set(0, 0);
    wrapper.addEventListener("pointermove", onPointerMove, { passive: true });
    wrapper.addEventListener("pointerleave", onPointerLeave);
    return () => {
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

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
