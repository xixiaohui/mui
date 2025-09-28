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

const { WelcomeScreen } = await import("@excalidraw/excalidraw");

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
      x: 100,
      y: 500,
      width: 1080,
      height: 1080,
      strokeColor: "#1971c2",
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
        
        {
          type: "text",
          x: 150,
          y: 250,
          text: "距离:",
          fontSize: 20,
          strokeColor: "#1971c2",
        },
        {
          type: "text",
          x: 150,
          y: 300,
          text: "时长:",
          fontSize: 20,
          strokeColor: "#1971c2",
        },
        {
          type: "text",
          x: 150,
          y: 350,
          text: "累计爬升:",
          fontSize: 20,
          strokeColor: "#1971c2",
        },
        {
          type: "text",
          x: 150,
          y: 400,
          text: "平均速度:",
          fontSize: 20,
          strokeColor: "#1971c2",
        },
        freedraw,
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
          appState: { viewBackgroundColor: "#f8f9fa" },
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
      >
        <WelcomeScreen />
      </Excalidraw>
    </div>
  );
}
