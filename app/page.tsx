"use client";

import { useEffect, useRef, useState } from "react";

type Scene = {
  eyebrow: string;
  title: string;
  prompt: string;
  options: string[];
  replies: string[];
  certificateReplies: string[];
  prop: string;
  pass: number[];
  look: string;
  face: string;
  place: string;
};

const scenes: Scene[] = [
  {
    eyebrow: "观众申请 · 01",
    title: "请选择你的高贵身份",
    prompt: "欢迎报名成为一名普通观众。\n在此之前，请证明你并不普通。",
    options: ["自媒体账号，10万粉丝", "创业导师，50万粉丝", "投资人，正在看项目", "普通科技爱好者"],
    replies: ["很好，你拥有传播价值。", "很好，你拥有成功学价值。", "贵宾通道似乎亮了一下。", "系统未识别“普通人”这一商业价值类型。"],
    certificateReplies: ["你的自媒体影响力符合要求。", "你的创业导师身份符合要求。", "你的投资人身份符合要求。", "你只是普通科技爱好者，没有十万粉丝，也不是导师或投资人。"],
    prop: "📋",
    pass: [0, 1, 2],
    look: "identity",
    face: "•‿•",
    place: "资料审核中心",
  },
  {
    eyebrow: "第二关",
    title: "查询资格邮件",
    prompt: "我们已经发送了一封非常重要的邮件。\n它可能不希望被你找到。",
    options: ["收件箱", "垃圾邮件", "订阅邮件", "另一个邮箱"],
    replies: ["这里只有广告。", "恭喜，垃圾邮件比你更懂分类。", "你订阅了 83 封活动周报。", "答对了，但你忘了另一个邮箱的密码。"],
    certificateReplies: ["你只检查了收件箱，没有在垃圾邮件中找到观众资格通知。", "你在垃圾邮件中找到了观众资格通知。", "你翻完了订阅邮件，仍然没有找到观众资格通知。", "你找到了正确邮箱，但忘记密码，无法查看观众资格通知。"],
    prop: "✉️",
    pass: [1],
    look: "mail",
    face: "•︵•",
    place: "邮箱深处",
  },
  {
    eyebrow: "第三关",
    title: "AI 项目问卷调查",
    prompt: "请问你正在做什么与 AI 有关的项目？\n回答将用于评估你的观众资格。",
    options: ["随便乱填", "认真填写", "让 AI 帮我填"],
    replies: ["恭喜，系统未检测到任何值得追问的细节。", "内容过于具体，需要进入人工复审。", "系统检测到回答中 AI 含量为 100%，本人含量不足。"],
    certificateReplies: ["你随便填写了项目问卷，系统没有发现需要追问的问题。", "你的回答过于认真，系统决定把你送去无限期人工复审。", "问卷由 AI 代填，系统检测到本人参与度不足。"],
    prop: "📝",
    pass: [0],
    look: "survey",
    face: "•ᴗ•?",
    place: "AI 项目问卷室",
  },
  {
    eyebrow: "第四关",
    title: "观众资格抽签",
    prompt: "报名不代表入选。\n入选也不代表入场。祝你好运！",
    options: ["郑重抽签", "虔诚抽签", "闭眼抽签", "相信科技"],
    replies: ["恭喜！你获得了等待下一轮通知的资格。", "命运说：请刷新邮箱。", "你中签了，但中签不等于入场。", "随机数生成器感受到了你的热爱。"],
    certificateReplies: ["你抽中了观众资格，可以继续等待通知。", "观众资格抽签失败。你的虔诚没有影响随机数。", "你抽中了观众资格，但中签仍不代表可以入场。", "观众资格抽签失败。相信科技也不能提高中签率。"],
    prop: "🎰",
    pass: [0, 2],
    look: "lottery",
    face: "•﹏•",
    place: "观众抽签区",
  },
  {
    eyebrow: "第五关",
    title: "进入正确的观众群",
    prompt: "黑客松观众必须进群，才能获得入场信息。\n至于是哪个群，请加入群后查看。",
    options: ["报名交流群", "中签观众群", "现场临时群", "联系陌生管理员"],
    replies: ["这是去年的群。", "该群已满 500 人。", "恭喜你，运气不错，终于找到临时观众群了。", "管理员开启了好友验证。"],
    certificateReplies: ["你进入了去年的报名群，没有获得今年的入场信息。", "你找到了观众群，但群已满 500 人，无法加入。", "你进入了正确的临时观众群，终于获得入场信息。", "你联系了管理员，但好友验证尚未通过，无法加入观众群。"],
    prop: "💬",
    pass: [2],
    look: "group",
    face: "•᷄ࡇ•᷅",
    place: "群聊传送门",
  },
  {
    eyebrow: "第六关",
    title: "到达黑客松场地",
    prompt: "恭喜来到黑客松场地。\n请出示正确的二维码以便进入。",
    options: ["入群码", "入场码", "身份码", "看起来最像码的码"],
    replies: ["二维码已过期。", "这是获得入场码的二维码。", "身份有效，资格未知。", "这是赞助商 Logo。"],
    certificateReplies: ["你出示的是入群二维码，不是有效的现场入场码。", "你出示了正确的入场二维码。", "你证明了自己的身份，但没有证明自己可以入场。", "你扫描的是赞助商 Logo，不是入场二维码。"],
    prop: "▦",
    pass: [1],
    look: "qr",
    face: "⊙﹏⊙",
    place: "黑客松场地入口",
  },
  {
    eyebrow: "第七关",
    title: "到达黑客松现场",
    prompt: "门口工作人员：请问你是？",
    options: ["参赛者", "嘉宾", "投资人", "被邀请来当观众的观众"],
    replies: ["参赛者入口在另一栋楼。", "请出示嘉宾的嘉宾证明。", "贵宾通道似乎又亮了一下。", "工作人员：“不好意思，今天我们场地满了，坐不下了。您可以在外面看直播呢。”"],
    certificateReplies: ["你选择了参赛者身份，但参赛者入口在另一栋楼。", "你选择了嘉宾身份，但无法出示嘉宾证明。", "你选择了投资人身份，贵宾通道亮了一下，但观众资格仍未确认。", "你已经到达现场，但场地坐满了，只能在外面看直播。"],
    prop: "🚪",
    pass: [3],
    look: "door",
    face: "•̀ᴗ•́",
    place: "黑客松现场安检",
  },
];

const pigAccessories = ["📱", "✉️", "📝", "🎱", "💬", "▦", "🚪"];
const pigGags = ["粉丝还差 5000", "未读邮件 999+", "项目名称生成中…", "幸运值 0.01%", "第 501 位群友", "码比脸多", "直播观众：1"];

export default function Home() {
  const audioRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicStepRef = useRef(0);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showAuthorEgg, setShowAuthorEgg] = useState(false);
  const scene = scenes[step];

  const getAudio = () => {
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === "suspended") void audioRef.current.resume();
    return audioRef.current;
  };

  const tone = (frequency: number, duration = 0.08, volume = 0.035, delay = 0) => {
    const context = getAudio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  };

  const clickSound = () => { tone(520); tone(760, 0.06, 0.025, 0.045); };
  const passSound = () => { tone(440); tone(660, 0.1, 0.03, 0.07); tone(880, 0.12, 0.025, 0.15); };
  const failSound = () => {
    const context = getAudio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(240, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(62, context.currentTime + 0.55);
    gain.gain.setValueAtTime(0.07, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.58);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.58);
  };

  const stopMusic = () => {
    if (musicTimerRef.current) clearInterval(musicTimerRef.current);
    musicTimerRef.current = null;
  };

  const startMusic = () => {
    if (musicTimerRef.current) return;
    const notes = [330, 392, 494, 587, 392, 494, 523, 659, 349, 440, 494, 587, 392, 494, 587, 698];
    const bass = [82, 82, 98, 98, 87, 87, 98, 123];
    let note = 0;
    tone(notes[note], 0.12, 0.008);
    tone(bass[0], 0.15, 0.01);
    note += 1;
    musicTimerRef.current = setInterval(() => {
      const pressure = musicStepRef.current;
      const melodyVolume = pressure < 2 ? 0.008 : pressure < 4 ? 0.011 : 0.014;
      const bassVolume = pressure < 2 ? 0.01 : pressure < 4 ? 0.014 : 0.018;
      const drumEvery = pressure < 2 ? 8 : pressure < 4 ? 4 : 2;
      const melodyIndex = pressure >= 4 ? (note * 2) % notes.length : note % notes.length;
      tone(notes[melodyIndex], 0.12, melodyVolume);
      if (note % 2 === 0) tone(bass[Math.floor(note / 2) % bass.length], 0.15, bassVolume);
      if (note % drumEvery === 0) tone(55, 0.05, pressure < 2 ? 0.012 : pressure < 4 ? 0.017 : 0.023);
      if (pressure >= 4 && note % 4 === 2) tone(110, 0.04, 0.012);
      note += 1;
    }, 260);
  };

  useEffect(() => {
    musicStepRef.current = step;
  }, [step]);

  useEffect(() => () => {
    if (musicTimerRef.current) clearInterval(musicTimerRef.current);
    void audioRef.current?.close();
  }, []);

  const next = () => {
    clickSound();
    if (step === scenes.length - 1) setFinished(true);
    else {
      setStep(step + 1);
      setPicked(null);
      setEliminated(false);
      setShowCertificate(false);
      setShowAuthorEgg(false);
    }
  };

  const restart = () => {
    clickSound();
    stopMusic();
    setStarted(false);
    setStep(0);
    setPicked(null);
    setFinished(false);
    setEliminated(false);
    setShowCertificate(false);
    setShowAuthorEgg(false);
  };

  if (!started) {
    return (
      <main className="game-shell intro">
        <div className="intro-sky" aria-hidden="true">
          <span>✦</span><span>✧</span><span>✦</span>
        </div>
        <div className="intro-stage">
          <div className="hero-sprite hero-sprite--intro" aria-label="抱着电脑的女孩像素角色">
            <span className="hair" /><span className="face">•ᴗ•</span><span className="body">⌨</span>
          </div>
          <div className="intro-door" aria-hidden="true">HACK<br />ATHON</div>
        </div>
        <p className="eyebrow">观众资格大冒险</p>
        <h1>这是一场 AI 黑客松大会</h1>
        <p className="intro-copy">欢迎您来当观众。</p>
        <p className="intro-copy">人工智能时代来了，让创造发声。</p>
        <button className="primary intro-button" onClick={() => { setStarted(true); clickSound(); startMusic(); }}>开启观众申请</button>
      </main>
    );
  }

  const choose = (index: number) => {
    setPicked(index);
    if (!scene.pass.includes(index)) {
      setEliminated(true);
      failSound();
    } else passSound();
  };

  if (finished) {
    return (
      <main className="game-shell ending">
        <div className="pixel-stars" aria-hidden="true">✦　·　✧　·　✦</div>
        <div className="hero-sprite hero-sprite--win" aria-label="抱着电脑的女孩像素角色">
          <span className="hair" /><span className="face">•ᴗ•</span><span className="body">⌨</span>
        </div>
        <p className="eyebrow">成就解锁</p>
        <h1>黑进现场失败</h1>
        <p className="ending-copy">但你成功完成了黑客松。</p>
        <div className="final-line">真正的黑客松，是找到入口。</div>
        <button className="primary" onClick={restart}>再挑战一次</button>
        <button className="contact-author-button" onClick={() => { setShowAuthorEgg(true); passSound(); }}>
          👩🏻‍💻 联系作者
        </button>
        {showAuthorEgg && (
          <div className="author-egg-overlay" role="dialog" aria-modal="true" aria-label="联系作者">
            <div className="author-egg-card">
              <button className="certificate-close" onClick={() => setShowAuthorEgg(false)} aria-label="关闭作者信息">×</button>
              <div className="author-egg-icon">👩🏻‍💻</div>
              <p>找到作者</p>
              <h2>你没找到入口，<br />但找到了作者。</h2>
              <blockquote>一个喜欢科技、游戏和荒诞现实的女孩，把不好吐槽的事情做成了游戏。</blockquote>
              <p>公众号：温温温WENDY</p>
              <p>认识我，要打钱的。</p>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="game-shell">
      <header>
        <div className="logo">黑客松观众资格审查</div>
      </header>

      <section className={`scene scene--${scene.look}`} key={step}>
        <div className={`art ${eliminated ? "art--eliminated" : ""}`} aria-hidden="true">
          <div className="place-sign">{scene.place}</div>
          <div className="pixel-window"><span /><span /><span /></div>
          <div className="scene-detail detail-one" />
          <div className="scene-detail detail-two" />
          <div className="scene-prop">{scene.prop}</div>
          <div className="hero-sprite">
            <span className="hair" /><span className="face">{eliminated ? "×﹏×" : scene.face}</span><span className="body">⌨</span>
          </div>
          <div className="speech-bubble">{eliminated ? "我的观众资格呢？！" : ["先选一个身份…", "邮件到底在哪？", "项目要怎么编？", "拜托了抽签机！", "又是新群？！", "这次一定是对的码", "我终于到了！"][step]}</div>
          <div className="floor-shadow" />
          {step === scenes.length - 1 && (
            <button
              className="author-egg-trigger"
              onClick={() => { setShowAuthorEgg(true); passSound(); }}
              aria-label="一个闪光的像素小电脑"
            >⌨</button>
          )}
        </div>

        <div className="card">
          <p className="eyebrow">{scene.eyebrow}</p>
          <h1>{scene.title}</h1>
          <p className="prompt">{scene.prompt}</p>

          <div className="choices">
            {scene.options.map((option, index) => (
              <button
                key={option}
                className={picked === index ? "choice selected" : "choice"}
                onClick={() => choose(index)}
                disabled={picked !== null}
              >
                <b>{String.fromCharCode(65 + index)}</b><span>{option}</span>
              </button>
            ))}
          </div>

          {picked !== null && (
            <div className={eliminated ? "result result--fail" : "result result--pass"} role="status">
              <div className="result-dialog">
                <b>{eliminated ? "⚠ 观众资格已撤销" : "✓ 系统勉强通过"}</b>
                <span>{scene.replies[picked]}</span>
                {eliminated && <small>感谢参与。你的资料将继续参与本次活动。</small>}
              </div>
              <button className="primary" onClick={eliminated ? restart : next}>
                {eliminated ? "重新证明自己" : step === scenes.length - 1 ? "查看成就" : "继续"}
              </button>
              {eliminated && (
                <button className="certificate-button" onClick={() => setShowCertificate(true)}>领取淘汰证书</button>
              )}
            </div>
          )}
        </div>
      </section>

      {showCertificate && picked !== null && (
        <div className="certificate-overlay" role="dialog" aria-modal="true" aria-label="观众资格淘汰证书">
          <div className="certificate">
            <button className="certificate-close" onClick={() => setShowCertificate(false)} aria-label="关闭证书">×</button>
            <div className="certificate-stars">✦　✧　✦</div>
            <h2>黑客松观众淘汰证</h2>
            <div className={`certificate-avatar pig-${step + 1}`}>
              <span className="pig-face">🐷</span>
              <span className="pig-accessory">{pigAccessories[step]}</span>
            </div>
            <div className="pig-gag">{pigGags[step]}</div>
            <span>你申请进入 AI 黑客松现场，在第 {step + 1} 关被淘汰。</span>
            <blockquote><b>淘汰原因：</b>{scene.certificateReplies[picked]}</blockquote>
            <div className="certificate-stamp">不准进场</div>
          </div>
        </div>
      )}

      {showAuthorEgg && (
        <div className="author-egg-overlay" role="dialog" aria-modal="true" aria-label="隐藏作者彩蛋">
          <div className="author-egg-card">
            <button className="certificate-close" onClick={() => setShowAuthorEgg(false)} aria-label="关闭作者彩蛋">×</button>
            <div className="author-egg-icon">👩🏻‍💻</div>
            <p>隐藏成就解锁</p>
            <h2>你没找到入口，<br />但找到了作者。</h2>
            <blockquote>一个喜欢科技、游戏和荒诞现实的女孩，把不好吐槽的事情做成了游戏。</blockquote>
            <p>公众号：温温温WENDY</p>
            <p>认识我，要打钱的。</p>
            <small>作者比正确入口稍微好找一点。</small>
          </div>
        </div>
      )}
    </main>
  );
}
