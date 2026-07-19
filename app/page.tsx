"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Drop = { id: number; lane: number; kind: "good" | "bad"; icon: string; label: string };
type Screen = "intro" | "game" | "report";

const goodThings = [
  { icon: "🎂", label: "生日蛋糕" },
  { icon: "🕯️", label: "快乐蜡烛" },
  { icon: "🍭", label: "棉签棒棒糖" },
  { icon: "✨", label: "好运样本" },
];
const badThings = [
  { icon: "🌀", label: "健康码转圈" },
  { icon: "⏳", label: "排队两小时" },
  { icon: "🪪", label: "忘带身份证" },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [lane, setLane] = useState(1);
  const [score, setScore] = useState(0);
  const [trouble, setTrouble] = useState(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [seconds, setSeconds] = useState(18);
  const [toast, setToast] = useState("收集 8 份快乐样本");
  const nextId = useRef(1);

  const finish = () => setScreen("report");

  const reset = () => {
    setLane(1); setScore(0); setTrouble(0); setDrops([]); setSeconds(18);
    setToast("收集 8 份快乐样本"); setScreen("game");
  };

  useEffect(() => {
    if (screen !== "game") return;
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(event.key)) setLane((v) => Math.max(0, v - 1));
      if (["ArrowRight", "d", "D"].includes(event.key)) setLane((v) => Math.min(2, v + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  useEffect(() => {
    if (screen !== "game") return;
    const timer = window.setInterval(() => setSeconds((value) => {
      if (value <= 1) { window.clearInterval(timer); finish(); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== "game") return;
    const spawner = window.setInterval(() => {
      const isGood = Math.random() > 0.28;
      const source = isGood ? goodThings : badThings;
      const item = source[Math.floor(Math.random() * source.length)];
      const drop = { id: nextId.current++, lane: Math.floor(Math.random() * 3), kind: isGood ? "good" as const : "bad" as const, ...item };
      setDrops((items) => [...items.slice(-5), drop]);
      window.setTimeout(() => setDrops((items) => items.filter((x) => x.id !== drop.id)), 2550);
    }, 720);
    return () => window.clearInterval(spawner);
  }, [screen]);

  const catchDrop = (drop: Drop) => {
    if (drop.lane !== lane || screen !== "game") return;
    setDrops((items) => items.filter((x) => x.id !== drop.id));
    if (drop.kind === "good") {
      const next = score + 1;
      setScore(next); setToast(`采样成功：${drop.label}`);
      if (next >= 8) window.setTimeout(finish, 350);
    } else {
      setTrouble((v) => v + 1); setToast(`哎呀：${drop.label}`);
    }
  };

  const confetti = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`, delay: `${(i % 7) * .13}s`, icon: ["✦", "●", "◆", "★"][i % 4]
  })), []);

  if (screen === "intro") return (
    <main className="shell intro">
      <div className="stars" aria-hidden="true">✦　·　✧　·　✦</div>
      <div className="avatar" aria-label="核酸女孩卡通头像"><span>👧🏻</span><i>🍭</i></div>
      <p className="kicker">生日限定 · 快乐检测中心</p>
      <h1>核酸女孩<br />今天做个快乐检测</h1>
      <p className="lead">收集生日样本，避开排队烦恼。<br />检测结果会是什么呢？</p>
      <button className="big-button" onClick={reset}>开始采样</button>
      <small>手机点按左右 · 电脑使用 ← →</small>
    </main>
  );

  if (screen === "report") return (
    <main className="shell report-page">
      <div className="confetti" aria-hidden="true">{confetti.map((c, i) => <i key={i} style={{ left: c.left, animationDelay: c.delay }}>{c.icon}</i>)}</div>
      <section className="report">
        <div className="report-head"><b>HAPPY LAB</b><span>生日限定检测报告</span></div>
        <div className="report-avatar">👧🏻<i>🎂</i></div>
        <h2>核酸女孩</h2>
        <p className="report-no">样本编号：HAPPY-{String(score).padStart(2, "0")}-0719</p>
        <dl>
          <div><dt>烦恼检测</dt><dd className="negative">阴性</dd></div>
          <div><dt>快乐指数</dt><dd>严重超标</dd></div>
          <div><dt>可爱浓度</dt><dd>100%</dd></div>
          <div><dt>好运有效期</dt><dd>一辈子</dd></div>
        </dl>
        <div className="stamp">烦恼阴性</div>
        <blockquote>核酸女孩，生日快乐！<br />愿你新的一岁，烦恼永远阴性，<br />快乐持续超标，好运无需复检！</blockquote>
        <button className="big-button" onClick={reset}>再检测一次</button>
        <button className="text-button" onClick={() => setScreen("intro")}>返回首页</button>
      </section>
    </main>
  );

  return (
    <main className="shell game-page">
      <header><div><span>快乐样本</span><b>{score}/8</b></div><div className="timer">00:{String(seconds).padStart(2, "0")}</div><div><span>小烦恼</span><b>{trouble}</b></div></header>
      <div className="toast">{toast}</div>
      <section className="track" aria-label="三条采样跑道">
        {[0, 1, 2].map((trackLane) => <div className="lane" key={trackLane} onClick={() => setLane(trackLane)} />)}
        {drops.map((drop) => <button key={drop.id} onClick={() => catchDrop(drop)} className={`drop drop-${drop.lane} ${drop.kind}`} aria-label={drop.label}><span>{drop.icon}</span><small>{drop.label}</small></button>)}
        <button className={`runner runner-${lane}`} aria-label="核酸女孩，点击切换跑道" onClick={() => setLane((lane + 1) % 3)}><span>👧🏻</span><i>🍭</i></button>
      </section>
      <div className="controls"><button onClick={() => setLane((v) => Math.max(0, v - 1))}>← 左移</button><p>接住掉下来的<br /><b>🎂 🕯️ 🍭 ✨</b></p><button onClick={() => setLane((v) => Math.min(2, v + 1))}>右移 →</button></div>
    </main>
  );
}
