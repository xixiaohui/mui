// @ts-nocheck

"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Excalidraw,
  CaptureUpdateAction,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

import type {
  ExcalidrawImperativeAPI,
  ExcalidrawFreeDrawElement,
  SceneData,
} from "@excalidraw/excalidraw/types";
import { COLOR_CHARCOAL_BLACK } from "@excalidraw/excalidraw/constants";

const generateRandomPoints = (count: number) => {
  const points: [number, number][] = [];
  let x = 0;
  let y = 0;

  for (let i = 0; i < count; i++) {
    // 每次随机前进一点
    x += Math.random() * 20 - 10; // -10 ~ 10
    y += Math.random() * 20 - 10; // -10 ~ 10
    points.push([x, y]);
  }

  return points;
};

const createFreedrawElement = (points: [number, number][]) => {
  return {
    id: "free-1",
    type: "freedraw",
    x: 100,
    y: 100,
    width: 200,
    height: 100,
    strokeColor: "#ff0000",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.random(),
    version: 1,
    versionNonce: Math.random(),
    isDeleted: false,
    boundElements: [],
    angle: 0,
    updated: Date.now(),
    index: "a1", // 新版必需
    points: generateRandomPoints(200),
    pressures: Array(points.length).fill(0.5), // 跟 points 对齐
    simulatePressure: false,
    lastCommittedPoint: null,
  } as ExcalidrawFreeDrawElement;
};

// 使用示例：生成随机折线
const points = [
  [0, 100],
  [20, 130],
  [50, 180],
  [250, 220],
] as [number, number][];

const freedrawElement = createFreedrawElement(points);

const freedraw: ExcalidrawFreeDrawElement = {
  id: "free-1",
  type: "freedraw",
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  strokeColor: "#ff0000",
  backgroundColor: "transparent",
  fillStyle: "solid",
  strokeWidth: 2,
  strokeStyle: "solid",
  roughness: 0,
  opacity: 100,
  groupIds: [],
  frameId: null,
  roundness: null,
  seed: Math.random(),
  version: 1,
  versionNonce: Math.random(),
  isDeleted: false,
  boundElements: [],
  angle: 0,
  updated: Date.now(),
  index: "a1", // 新版必需
  points: [
    [0, 0],
    [50, 30],
    [120, 60],
    [200, 100],
  ],
  pressures: [0.5, 0.5, 0.5, 0.5], // 跟 points 对齐
  simulatePressure: false,
  lastCommittedPoint: null,
};

export default function GpxExcalidrawPage() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  // 用于存储轨迹点
  const [scenePoints, setScenePoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const [scale, setScale] = useState(1);

  // 解析 GPX 文件
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");

    const trkpts = Array.from(xmlDoc.getElementsByTagName("trkpt"));
    if (trkpts.length === 0) {
      alert("没有找到轨迹点");
      return;
    }

    // 提取轨迹点
    const points = trkpts.map((pt) => ({
      lat: parseFloat(pt.getAttribute("lat") || "0"),
      lon: parseFloat(pt.getAttribute("lon") || "0"),
    }));

    // 简单坐标映射 (lon→x, lat→y)
    const minLat = Math.min(...points.map((p) => p.lat));
    const minLon = Math.min(...points.map((p) => p.lon));
    const maxLat = Math.max(...points.map((p) => p.lat));
    const maxLon = Math.max(...points.map((p) => p.lon));

    // 缩放比例，确保轨迹不会超出画布
    const scaleX = 200; // 水平缩放比例
    const scaleY = 200; // 垂直缩放比例
    const width = maxLon - minLon;
    const height = maxLat - minLat;

    const scale = Math.max(scaleX / width, scaleY / height); // 取较大比例，确保轨迹合适

    // 转换为 Excalidraw 的坐标系
    const transformedPoints = points.map((p) => ({
      x: (p.lon - minLon) * scale,
      y: -(p.lat - minLat) * scale, // Y轴反向
    }));

    setScenePoints(transformedPoints);
    setScale(scale);

    const freedraw: ExcalidrawFreeDrawElement = {
      id: "free-1",
      type: "freedraw",
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      strokeColor: "#ff0000",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: null,
      seed: Math.random(),
      version: 1,
      versionNonce: Math.random(),
      isDeleted: false,
      boundElements: [],
      angle: 0,
      updated: Date.now(),
      index: "a1", // 新版必需
      points: transformedPoints.map((p, i) => [
        p.x - transformedPoints[0].x,
        p.y - transformedPoints[0].y,
      ]),
      pressures: Array(transformedPoints.length).fill(0.2), // 跟 points 对齐
      simulatePressure: false,
      lastCommittedPoint: null,
    };

    const sceneData = {
      elements: convertToExcalidrawElements([
        freedraw,
        // {
        //   type: "text",
        //   x: 0,
        //   y: 250,
        //   text: "中秋快乐",
        //   fontSize: 20,
        //   strokeColor: "#5f3dc4",
        // },
        // {
        //   type: "rectangle",
        //   x: 100,
        //   y: 250,
        //   strokeColor: "#f08c00",
        //   backgroundColor: "#ffec99",
        // },
        // {
        //   type: "ellipse",
        //   x: 250,
        //   y: 250,
        // },
      ]),
      appState: {
        // viewBackgroundColor: "#a5d8ff",
        scrollToContent: true,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };

    // 更新画布
    excalidrawAPI?.updateScene(sceneData);
    excalidrawAPI?.scrollToContent();
  };

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw
        initialData={{
          // elements: [freedrawElement],
          appState: { viewBackgroundColor: "#a5d8ff" },
          scrollToContent: true,
        }}
        renderTopRightUI={() => (
          <div>
            <input
              type="file"
              accept=".gpx"
              onChange={handleFileUpload}
              style={{ marginRight: 7 }}
            />
          </div>
        )}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
}
