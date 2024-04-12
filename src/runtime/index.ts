/**
 * @title ShaderLab Basic
 * @category Material
 */

import { GridControl, OrbitControl } from "@galacean/engine-toolkit";
import {
  BufferMesh,
  Camera,
  Logger,
  WebGLEngine,
  Buffer,
  BufferBindFlag,
  BufferUsage,
  VertexElement,
  VertexElementFormat,
  MeshRenderer,
  PrimitiveMesh,
  Shader,
  Material,
  PBRMaterial,
  Color,
  DirectLight,
  AmbientLight,
  DiffuseMode,
  Vector3,
  Entity,
} from '@galacean/engine';
import { ShaderLab } from '@galacean/engine-shader-lab';
import shaderLoader from '../shaderlab';

const shaderLab = new ShaderLab();
let engine: WebGLEngine;
let shaderLabEntity: Entity;
let shaderlabRenderer: MeshRenderer;

function createPlaneMesh(engine: WebGLEngine) {
  const mesh = new BufferMesh(engine);
  const vertices = new Float32Array([
    -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1,
  ]);
  const vertexBuffer = new Buffer(
    engine,
    BufferBindFlag.VertexBuffer,
    vertices,
    BufferUsage.Static
  );
  mesh.setVertexBufferBinding(vertexBuffer, 12);
  mesh.setVertexElements([
    new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),
  ]);
  mesh.addSubMesh(0, 6);
  return mesh;
}

function createSphereMesh(engine: WebGLEngine) {
  return PrimitiveMesh.createSphere(engine, 1, 128);
}

function createMaterial(name: string) {
  const shader = Shader.create(shaderLoader[name]);
  const material = new Material(engine, shader);
  return material;
}

export function selectShader(name: string) {
  const material = createMaterial(name);
  shaderlabRenderer.setMaterial(material);
}

export function selectMode(name: 'plane' | 'sphere') {
  if (name === 'plane') {
    shaderlabRenderer.mesh = createPlaneMesh(engine);
  } else if (name === 'sphere') {
    shaderlabRenderer.mesh = createSphereMesh(engine);
  }
}

export async function createRuntime() {
  Logger.enable();

  engine = await WebGLEngine.create({ canvas: 'canvas', shaderLab });
  engine.canvas.resizeByClientSize();
  
  window.addEventListener('resize', () => {
    engine.canvas.resizeByClientSize();
  });

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // camera
  const cameraEntity = rootEntity.createChild('cameraNode');
  cameraEntity.transform.setPosition(1, 1, 10);
  
  const camera = cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  // grid
  const grid = rootEntity.addComponent(GridControl);
  grid.camera = camera;

  // create direct light
  const directLightNode = rootEntity.createChild('dir_light');
  const directLight = directLightNode.addComponent(DirectLight);
  directLight.intensity = 1.0;
  directLightNode.transform.setPosition(5, 5, 5);
  directLightNode.transform.lookAt(new Vector3(0, 0, 0));

  // create ambient light
  const ambientLight = new AmbientLight(engine);
  ambientLight.diffuseMode = DiffuseMode.SolidColor;
  ambientLight.diffuseSolidColor = new Color(1.0, 1.0, 1.0, 1);

  // create shaderlab entity
  shaderLabEntity = rootEntity.createChild('shaderlab');
  shaderlabRenderer = shaderLabEntity.addComponent(MeshRenderer);

  shaderlabRenderer.mesh = createSphereMesh(engine);

  const material = new PBRMaterial(engine);
  material.baseColor = new Color(1, 1, 1, 1);
  material.metallic = 0;
  material.roughness = 0;
  shaderlabRenderer.setMaterial(material);

  cameraEntity.transform.lookAt(shaderLabEntity.transform.position);

  engine.run();
}
