import { useState } from "react";

// ─── 25 AI TOOLS GROUPED BY CATEGORY ─────────────────────────────────────────
const AI_CATEGORIES = [
  {
    id: "text", label: "Text & Chat", emoji: "💬",
    tools: [
      { id: "chatgpt",    name: "ChatGPT",     icon: "🟢", maker: "OpenAI"     },
      { id: "claude",     name: "Claude",      icon: "🟠", maker: "Anthropic"  },
      { id: "gemini",     name: "Gemini",      icon: "🔵", maker: "Google"     },
      { id: "copilot",    name: "Copilot",     icon: "🪟", maker: "Microsoft"  },
      { id: "grok",       name: "Grok",        icon: "✖️", maker: "xAI"        },
      { id: "llama",      name: "Llama",       icon: "🦙", maker: "Meta"       },
      { id: "mistral",    name: "Mistral",     icon: "🌪️", maker: "Mistral AI" },
      { id: "perplexity", name: "Perplexity",  icon: "🔍", maker: "Perplexity" },
      { id: "notebooklm", name: "NotebookLM",  icon: "📓", maker: "Google"     },
      { id: "cohere",     name: "Cohere",      icon: "🔷", maker: "Cohere"     },
    ]
  },
  {
    id: "image", label: "Image AI", emoji: "🎨",
    tools: [
      { id: "midjourney", name: "Midjourney",  icon: "🎨", maker: "Midjourney" },
      { id: "dalle",      name: "DALL·E 3",    icon: "🖼️", maker: "OpenAI"     },
      { id: "stablediff", name: "Stable Diffusion", icon: "🌀", maker: "Stability AI" },
      { id: "ideogram",   name: "Ideogram",    icon: "💡", maker: "Ideogram"   },
      { id: "firefly",    name: "Adobe Firefly", icon: "🔥", maker: "Adobe"   },
      { id: "flux",       name: "Flux",        icon: "⚗️", maker: "Black Forest Labs" },
    ]
  },
  {
    id: "video", label: "Video AI", emoji: "🎬",
    tools: [
      { id: "sora",    name: "Sora",    icon: "🎬", maker: "OpenAI"   },
      { id: "runway",  name: "Runway",  icon: "🎞️", maker: "Runway"   },
      { id: "pika",    name: "Pika",    icon: "🐣", maker: "Pika Labs" },
      { id: "kling",   name: "Kling",   icon: "🎥", maker: "Kuaishou" },
      { id: "heygen",  name: "HeyGen",  icon: "👤", maker: "HeyGen"   },
      { id: "luma",    name: "Luma Dream Machine", icon: "💎", maker: "Luma" },
    ]
  },
  {
    id: "audio", label: "Audio & Music", emoji: "🎵",
    tools: [
      { id: "elevenlabs", name: "ElevenLabs", icon: "🎙️", maker: "ElevenLabs" },
      { id: "suno",       name: "Suno",       icon: "🎵", maker: "Suno"       },
      { id: "udio",       name: "Udio",       icon: "🎶", maker: "Udio"       },
    ]
  },
];

const ALL_TOOLS = AI_CATEGORIES.flatMap(c => c.tools);

const MARKETPLACE_CATEGORIES = ["All", "Marketing", "Coding", "Design", "Writing", "Business", "Education", "Video", "Music", "Fun"];

const MARKETPLACE_PROMPTS = [
  { id:1,  title: "Viral Twitter/X Thread",     category:"Marketing",  ai:"ChatGPT",    uses:8821, rating:4.9, author:"GrowthHacker", prompt: "You are a viral Twitter thread writer with 500k+ followers. Create a compelling 10-tweet thread about [TOPIC]. Start with a scroll-stopping hook tweet, deliver one insight per tweet, add relevant emojis, keep each tweet under 260 characters, and end with a strong CTA. Make it punchy, bold, and shareable." },
  { id:2,  title: "Cinematic Portrait",          category:"Design",     ai:"Midjourney", uses:12400, rating:4.9, author:"ArtDirector", prompt: "Hyper-realistic cinematic portrait of [SUBJECT], golden hour backlight, shallow depth of field, shot on Phase One IQ4, 85mm lens, film grain, editorial magazine quality, warm honey tones, Vogue Italia style --ar 2:3 --v 6.1 --style raw --q 2" },
  { id:3,  title: "Senior Code Reviewer",        category:"Coding",     ai:"Claude",     uses:5190, rating:5.0, author:"DevWizard",    prompt: "You are a principal software engineer at a FAANG company with 15 years of experience. Review this code for: (1) Logic bugs, (2) Security vulnerabilities, (3) Performance bottlenecks, (4) Best practice violations. For each issue: quote the problematic line, explain the risk, and provide a corrected version with explanation." },
  { id:4,  title: "Complete Business Plan",      category:"Business",   ai:"ChatGPT",    uses:9720, rating:4.7, author:"StartupGuru",  prompt: "Create a comprehensive business plan for [BUSINESS IDEA] targeting [TARGET MARKET]. Include: Executive Summary, Problem & Solution, Market Size (TAM/SAM/SOM), Competitive Analysis, Business Model & Pricing, Go-to-Market Strategy, Team Requirements, Financial Projections (3 years), Key Risks & Mitigations. Be specific with numbers." },
  { id:5,  title: "Dream Interior Design",       category:"Design",     ai:"DALL·E 3",   uses:4890, rating:4.6, author:"DesignPro",    prompt: "Interior design photograph of a [ROOM TYPE] in [STYLE] style, large windows flooding the space with natural light, [COLOR PALETTE] palette with [MATERIAL] textures, luxury bespoke furniture, architectural digest quality, ultra-photorealistic, 8K, no people" },
  { id:6,  title: "YouTube Script Writer",       category:"Marketing",  ai:"Claude",     uses:7540, rating:4.8, author:"ContentKing",  prompt: "Write a complete YouTube video script for a [DURATION]-minute video on [TOPIC] for [TARGET AUDIENCE]. Structure: (1) Hook — grab attention in 8 seconds, (2) Problem statement, (3) Main content with 3-5 sections, (4) Each section with B-roll suggestions, (5) Strong CTA with urgency. Tone: [TONE]. Add [TIMESTAMPS]." },
  { id:7,  title: "Study Notes + Quiz",          category:"Education",  ai:"ChatGPT",    uses:11810, rating:4.9, author:"StudyAce",    prompt: "Transform this content into elite study notes. Format: • Key concepts bolded, • Bullet hierarchy for sub-points, • Memory anchors using vivid analogies, • 'Common mistakes' warnings in boxes, • A 10-question quiz at the end with answer key. Grade level: [LEVEL]. Content: [PASTE CONTENT HERE]" },
  { id:8,  title: "AI Avatar Script",            category:"Video",      ai:"HeyGen",     uses:3200, rating:4.7, author:"VideoCreator", prompt: "Write a natural-sounding [DURATION]-second speaking script for an AI avatar presenter about [TOPIC]. Use short sentences (max 15 words each). Add [PAUSE] markers for breathing. Include natural phrases like 'Now here's the interesting part' and 'Think about it this way'. Tone: confident, conversational. End with a clear call to action." },
  { id:9,  title: "Emotional Brand Story",       category:"Writing",    ai:"Claude",     uses:4100, rating:4.8, author:"StoryArchitect", prompt: "Write a brand origin story for [COMPANY/PRODUCT] that makes people feel something. Use the 'founder in pain' narrative structure: (1) The moment everything broke, (2) The failed solutions, (3) The breakthrough, (4) The mission born from it. Max 300 words. No corporate speak. Write like a human who's been through something real." },
  { id:10, title: "Music Prompt Generator",      category:"Music",      ai:"Suno",       uses:2800, rating:4.6, author:"BeatMaker",    prompt: "[GENRE] track with [MOOD] energy, [INSTRUMENTS], [TEMPO] BPM, [ERA]-inspired production, [VOCALS TYPE] vocals singing about [THEME], hook-driven structure with verse-chorus-bridge, radio-ready mix quality, inspired by [ARTIST REFERENCE] but original" },
  { id:11, title: "Roast My Startup Idea",       category:"Fun",        ai:"Claude",     uses:3920, rating:4.5, author:"HonestAI",     prompt: "You are a brutal but brilliant VC who has seen 10,000 pitches. Roast my idea mercilessly: point out every flaw, every market trap, every reason it will fail, every competitor that already does it better. Then — because you actually want founders to succeed — give me the 3 pivots that could make this genuinely work. My idea: [IDEA]" },
  { id:12, title: "Runway Cinematic Scene",      category:"Video",      ai:"Runway",     uses:5600, rating:4.8, author:"FilmDirector",  prompt: "Cinematic [SHOT TYPE] of [SCENE DESCRIPTION], [LIGHTING], [TIME OF DAY], slow motion, shallow depth of field, anamorphic lens flare, color grade: [STYLE], film grain, no camera shake, inspired by [DIRECTOR/FILM] cinematography, photorealistic, 4K" },
];

async function callClaude(system, userMsg) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "API error");
  return data.content.map(b => b.text || "").join("");
}

const TABS = [
  { id: "generate",    label: "Generate",    icon: "✦" },
  { id: "optimize",    label: "Optimize",    icon: "⚡" },
  { id: "marketplace", label: "Marketplace", icon: "◈" },
];

export default function Promptsmith() {
  const [tab, setTab] = useState("generate");

  // Generate
  const [gCat, setGCat]         = useState("text");
  const [gTool, setGTool]       = useState(null);
  const [gGoal, setGGoal]       = useState("");
  const [gResult, setGResult]   = useState("");
  const [gLoading, setGLoading] = useState(false);
  const [gError, setGError]     = useState("");

  // Optimize
  const [oCat, setOCat]         = useState("text");
  const [oTool, setOTool]       = useState(null);
  const [oInput, setOInput]     = useState("");
  const [oResult, setOResult]   = useState("");
  const [oLoading, setOLoading] = useState(false);
  const [oError, setOError]     = useState("");

  // Marketplace
  const [mCat, setMCat]     = useState("All");
  const [mSearch, setMSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerate = async () => {
    if (!gTool || !gGoal.trim()) return;
    setGLoading(true); setGError(""); setGResult("");
    try {
      const catLabel = AI_CATEGORIES.find(c => c.id === gCat)?.label || "";
      const sys = `You are a world-class prompt engineer specializing in ${gTool.name} (${catLabel}). 
Output ONLY the finished prompt — no preamble, no explanation, no quotes around it.
Make it highly specific, detailed, and optimized for ${gTool.name}'s unique capabilities and syntax.
Include [PLACEHOLDER] variables where the user should customize. Make it ready to use immediately.`;
      const result = await callClaude(sys, `Create the perfect ${gTool.name} prompt for this goal: ${gGoal}`);
      setGResult(result.trim());
    } catch (e) { setGError("Something went wrong. Please try again."); }
    setGLoading(false);
  };

  const handleOptimize = async () => {
    if (!oInput.trim()) return;
    setOLoading(true); setOError(""); setOResult("");
    try {
      const toolCtx = oTool ? `optimized for ${oTool.name}` : "optimized for general AI use";
      const sys = `You are a prompt engineering expert. Rewrite weak prompts to be dramatically more effective.
Output ONLY the improved prompt — no explanation, no intro, no quotes.
The improved prompt should be ${toolCtx}: more specific, structured, and powerful than the original.`;
      const result = await callClaude(sys, `Improve this prompt dramatically: ${oInput}`);
      setOResult(result.trim());
    } catch (e) { setOError("Something went wrong. Please try again."); }
    setOLoading(false);
  };

  const filteredPrompts = MARKETPLACE_PROMPTS.filter(p => {
    const matchCat = mCat === "All" || p.category === mCat;
    const q = mSearch.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.ai.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const currentGenCat = AI_CATEGORIES.find(c => c.id === gCat);
  const currentOptCat = AI_CATEGORIES.find(c => c.id === oCat);

  return (
    <div style={S.root}>
      <Noise />
      <Orbs />

      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={S.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" fill="none" stroke="#e8c547" strokeWidth="1.5"/>
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="none" stroke="#e8c547" strokeWidth="1" opacity="0.5"/>
            <circle cx="14" cy="14" r="2.5" fill="#e8c547"/>
          </svg>
          <div>
            <h1 style={S.logoName}>Promptsmith</h1>
            <p style={S.logoSub}>Craft prompts that work</p>
          </div>
        </div>
        <div style={S.headerRight}>
          <span style={S.statBadge}>25 AI Tools</span>
          <span style={S.statBadge}>{MARKETPLACE_PROMPTS.length} Prompts</span>
          <span style={S.betaBadge}>BETA</span>
        </div>
      </header>

      {/* ── TABS ── */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{...S.navTab, ...(tab===t.id ? S.navTabOn : {})}}>
              <span style={S.navIcon}>{t.icon}</span>
              {t.label}
              {tab===t.id && <span style={S.navUnderline}/>}
            </button>
          ))}
        </div>
        <div style={S.navLine}/>
      </nav>

      {/* ── MAIN ── */}
      <main style={S.main}>

        {/* ╔══ GENERATE ══╗ */}
        {tab === "generate" && (
          <div style={S.panel}>
            <Heading title="Generate a Prompt" sub="Pick an AI, describe your goal — get a production-ready prompt in seconds." />

            <Step n="01" label="Choose AI category">
              <div style={S.catTabs}>
                {AI_CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => { setGCat(c.id); setGTool(null); }}
                    style={{...S.catTab, ...(gCat===c.id ? S.catTabOn : {})}}>
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
            </Step>

            <Step n="02" label={`Select ${currentGenCat?.label} tool`}>
              <div style={S.toolGrid}>
                {currentGenCat?.tools.map(tool => (
                  <button key={tool.id} onClick={() => setGTool(tool)}
                    style={{...S.toolBtn, ...(gTool?.id===tool.id ? S.toolBtnOn : {})}}>
                    <span style={S.toolIcon}>{tool.icon}</span>
                    <span style={S.toolName}>{tool.name}</span>
                    <span style={S.toolMaker}>{tool.maker}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n="03" label="Describe your goal">
              <textarea value={gGoal} onChange={e=>setGGoal(e.target.value)}
                placeholder={gTool
                  ? `What do you want to achieve with ${gTool.name}? Be as specific as possible...`
                  : "First select an AI tool above, then describe your goal here..."}
                style={S.textarea} rows={4}/>
            </Step>

            <ForgeButton onClick={handleGenerate} loading={gLoading}
              disabled={!gTool || !gGoal.trim()} label="⚒  Forge Prompt"/>

            {gError && <ErrorBox msg={gError}/>}
            {gResult && <ResultBox result={gResult} id="gen" copied={copied} onCopy={copy}
              label={`✦  Prompt for ${gTool?.name}`}/>}
          </div>
        )}

        {/* ╔══ OPTIMIZE ══╗ */}
        {tab === "optimize" && (
          <div style={S.panel}>
            <Heading title="Optimize a Prompt" sub="Paste any weak, vague prompt — we transform it into something powerful and specific." />

            <Step n="01" label="Paste your current prompt">
              <textarea value={oInput} onChange={e=>setOInput(e.target.value)}
                placeholder="Paste your weak prompt here... e.g. 'write a blog post about coffee'"
                style={S.textarea} rows={5}/>
            </Step>

            <Step n="02" label="Target AI tool (optional — improves results)">
              <div style={S.catTabs}>
                {AI_CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => { setOCat(c.id); setOTool(null); }}
                    style={{...S.catTab, ...(oCat===c.id ? S.catTabOn : {})}}>
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
              <div style={{...S.toolGrid, marginTop:"12px"}}>
                {currentOptCat?.tools.map(tool => (
                  <button key={tool.id} onClick={() => setOTool(oTool?.id===tool.id ? null : tool)}
                    style={{...S.toolBtn, ...(oTool?.id===tool.id ? S.toolBtnOn : {})}}>
                    <span style={S.toolIcon}>{tool.icon}</span>
                    <span style={S.toolName}>{tool.name}</span>
                    <span style={S.toolMaker}>{tool.maker}</span>
                  </button>
                ))}
              </div>
            </Step>

            <ForgeButton onClick={handleOptimize} loading={oLoading}
              disabled={!oInput.trim()} label="⚡  Optimize Prompt"/>

            {oError && <ErrorBox msg={oError}/>}
            {oResult && <ResultBox result={oResult} id="opt" copied={copied} onCopy={copy}
              label="⚡  Optimized Prompt"/>}
          </div>
        )}

        {/* ╔══ MARKETPLACE ══╗ */}
        {tab === "marketplace" && (
          <div style={S.panel}>
            <Heading title="Prompt Marketplace" sub={`${MARKETPLACE_PROMPTS.length} battle-tested prompts, handcrafted by the community.`}/>

            <input value={mSearch} onChange={e=>setMSearch(e.target.value)}
              placeholder="🔍  Search by title, category, or AI tool..."
              style={S.search}/>

            <div style={S.mktCats}>
              {MARKETPLACE_CATEGORIES.map(c => (
                <button key={c} onClick={()=>setMCat(c)}
                  style={{...S.mktCat, ...(mCat===c ? S.mktCatOn : {})}}>
                  {c}
                </button>
              ))}
            </div>

            <div style={S.mktGrid}>
              {filteredPrompts.map(p => (
                <div key={p.id} style={S.mktCard}>
                  <div style={S.mktCardHead}>
                    <div style={S.mktBadges}>
                      <span style={S.aiBadge}>{p.ai}</span>
                      <span style={S.catBadge}>{p.category}</span>
                    </div>
                    <span style={S.freeBadge}>Free</span>
                  </div>
                  <h3 style={S.mktTitle}>{p.title}</h3>
                  <p style={S.mktMeta}>⭐ {p.rating} &nbsp;·&nbsp; {p.uses.toLocaleString()} uses &nbsp;·&nbsp; @{p.author}</p>
                  <div style={S.mktBtns}>
                    <button onClick={()=>setExpanded(expanded===p.id?null:p.id)} style={S.previewBtn}>
                      {expanded===p.id ? "Hide" : "Preview"}
                    </button>
                    <button onClick={()=>copy(p.prompt, p.id)} style={S.useBtn}>
                      {copied===p.id ? "✓ Copied!" : "Use Prompt →"}
                    </button>
                  </div>
                  {expanded===p.id && <div style={S.preview}>{p.prompt}</div>}
                </div>
              ))}
            </div>

            {filteredPrompts.length===0 && (
              <div style={S.empty}>No prompts matched — try a different search or category.</div>
            )}
          </div>
        )}

      </main>

      <footer style={S.footer}>
        ⬡ &nbsp; Promptsmith · Craft prompts that work &nbsp;·&nbsp; 25 AI tools · Powered by Claude API
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IBM+Plex+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#080810}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#080810}
        ::-webkit-scrollbar-thumb{background:#1e1e30;border-radius:3px}
        textarea:focus,input:focus{outline:none!important;border-color:#e8c547!important;box-shadow:0 0 0 2px rgba(232,197,71,0.12)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.7}}
      `}</style>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Noise() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,opacity:0.025,pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat:"repeat",backgroundSize:"128px"}}/>
  );
}

function Orbs() {
  return <>
    <div style={{position:"fixed",top:"-300px",left:"-200px",width:"700px",height:"700px",borderRadius:"50%",
      background:"radial-gradient(circle,rgba(232,197,71,0.06) 0%,transparent 65%)",
      animation:"pulse 8s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"fixed",bottom:"-200px",right:"-150px",width:"600px",height:"600px",borderRadius:"50%",
      background:"radial-gradient(circle,rgba(80,100,220,0.05) 0%,transparent 65%)",
      animation:"pulse 12s ease-in-out infinite 4s",pointerEvents:"none",zIndex:0}}/>
  </>;
}

function Heading({title, sub}) {
  return (
    <div style={{marginBottom:"40px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"32px",fontWeight:900,
        color:"#f0ece0",letterSpacing:"-0.5px",lineHeight:1.1}}>{title}</h2>
      <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"12px",color:"#4a4860",
        marginTop:"10px",letterSpacing:"0.3px"}}>{sub}</p>
    </div>
  );
}

function Step({n, label, children}) {
  return (
    <div style={{marginBottom:"32px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#e8c547",
          border:"1px solid rgba(232,197,71,0.3)",borderRadius:"4px",padding:"2px 7px",
          letterSpacing:"1px"}}>{n}</span>
        <span style={{fontFamily:"'Instrument Sans',sans-serif",fontSize:"13px",
          fontWeight:600,color:"#7a7898",letterSpacing:"0.5px",textTransform:"uppercase"}}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function ForgeButton({onClick, loading, disabled, label}) {
  return (
    <button onClick={onClick} disabled={disabled||loading}
      style={{width:"100%",padding:"16px",marginBottom:"24px",
        background: disabled||loading ? "rgba(232,197,71,0.15)" : "linear-gradient(135deg,#e8c547,#c89520)",
        border:"none",borderRadius:"10px",
        color: disabled||loading ? "rgba(232,197,71,0.4)" : "#0a0a14",
        fontSize:"14px",fontWeight:700,fontFamily:"'Instrument Sans',sans-serif",
        cursor: disabled||loading ? "not-allowed" : "pointer",
        letterSpacing:"1px",transition:"all 0.2s"}}>
      {loading ? (
        <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}>
          <span style={{width:"13px",height:"13px",border:"2px solid rgba(0,0,0,0.2)",
            borderTopColor:"#000",borderRadius:"50%",display:"inline-block",
            animation:"spin 0.7s linear infinite"}}/>
          Processing...
        </span>
      ) : label}
    </button>
  );
}

function ErrorBox({msg}) {
  return <div style={{padding:"12px 16px",background:"rgba(220,60,60,0.08)",
    border:"1px solid rgba(220,60,60,0.25)",borderRadius:"8px",color:"#e06060",
    fontFamily:"'IBM Plex Mono',monospace",fontSize:"12px",marginBottom:"16px"}}>{msg}</div>;
}

function ResultBox({result, id, copied, onCopy, label}) {
  return (
    <div style={{background:"rgba(232,197,71,0.05)",border:"1px solid rgba(232,197,71,0.18)",
      borderRadius:"12px",padding:"22px",animation:"fadeUp 0.35s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",
          color:"#e8c547",letterSpacing:"1.5px",textTransform:"uppercase"}}>{label}</span>
        <button onClick={()=>onCopy(result,id)}
          style={{padding:"5px 14px",background:"rgba(232,197,71,0.12)",
            border:"1px solid rgba(232,197,71,0.28)",borderRadius:"6px",
            color:"#e8c547",cursor:"pointer",fontSize:"11px",
            fontFamily:"'IBM Plex Mono',monospace",transition:"all 0.2s"}}>
          {copied===id ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"13px",
        color:"#c0bcd8",lineHeight:"1.85",whiteSpace:"pre-wrap"}}>{result}</p>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  root:{fontFamily:"'Instrument Sans',sans-serif",background:"#080810",color:"#e0ddf4",
    minHeight:"100vh",position:"relative",overflowX:"hidden"},
  header:{position:"relative",zIndex:10,display:"flex",alignItems:"center",
    justifyContent:"space-between",padding:"20px 32px",
    borderBottom:"1px solid rgba(232,197,71,0.1)",
    background:"rgba(8,8,16,0.85)",backdropFilter:"blur(24px)"},
  logo:{display:"flex",alignItems:"center",gap:"14px"},
  logoName:{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:900,
    color:"#f0ece0",letterSpacing:"-0.3px"},
  logoSub:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",color:"#3a3858",
    letterSpacing:"1px",marginTop:"2px",textTransform:"uppercase"},
  headerRight:{display:"flex",alignItems:"center",gap:"8px"},
  statBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#5a5878",
    border:"1px solid rgba(255,255,255,0.06)",borderRadius:"100px",padding:"3px 10px"},
  betaBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#e8c547",
    border:"1px solid rgba(232,197,71,0.3)",borderRadius:"100px",padding:"3px 10px"},
  nav:{position:"relative",zIndex:10,background:"rgba(8,8,16,0.7)",backdropFilter:"blur(12px)"},
  navInner:{display:"flex",padding:"0 32px",gap:"0"},
  navTab:{display:"flex",alignItems:"center",gap:"8px",padding:"14px 22px",
    background:"transparent",border:"none",color:"#3a3858",cursor:"pointer",
    fontFamily:"'Instrument Sans',sans-serif",fontSize:"14px",fontWeight:600,
    position:"relative",transition:"color 0.2s"},
  navTabOn:{color:"#e8c547"},
  navIcon:{fontSize:"12px"},
  navUnderline:{position:"absolute",bottom:0,left:"22px",right:"22px",height:"2px",
    background:"#e8c547",borderRadius:"2px 2px 0 0"},
  navLine:{height:"1px",background:"rgba(255,255,255,0.05)",margin:"0 32px"},
  main:{position:"relative",zIndex:10,maxWidth:"900px",margin:"0 auto",padding:"44px 24px"},
  panel:{animation:"fadeUp 0.3s ease"},
  catTabs:{display:"flex",flexWrap:"wrap",gap:"8px"},
  catTab:{display:"flex",alignItems:"center",gap:"6px",padding:"8px 16px",
    background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
    borderRadius:"8px",color:"#5a5878",cursor:"pointer",fontSize:"13px",
    fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,transition:"all 0.18s"},
  catTabOn:{background:"rgba(232,197,71,0.1)",borderColor:"rgba(232,197,71,0.35)",color:"#e8c547"},
  toolGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"8px",marginTop:"12px"},
  toolBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",
    padding:"12px 8px",background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.07)",borderRadius:"10px",
    cursor:"pointer",transition:"all 0.18s",textAlign:"center"},
  toolBtnOn:{background:"rgba(232,197,71,0.09)",borderColor:"rgba(232,197,71,0.4)"},
  toolIcon:{fontSize:"18px",lineHeight:1},
  toolName:{fontFamily:"'Instrument Sans',sans-serif",fontSize:"12px",fontWeight:700,
    color:"#c0bcd8",marginTop:"2px"},
  toolMaker:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px",color:"#3a3858"},
  textarea:{width:"100%",background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.09)",borderRadius:"10px",
    color:"#c0bcd8",fontSize:"13px",padding:"14px 16px",resize:"vertical",
    fontFamily:"'IBM Plex Mono',monospace",lineHeight:"1.7",transition:"all 0.2s"},
  search:{width:"100%",background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.09)",borderRadius:"10px",
    color:"#c0bcd8",fontSize:"13px",padding:"13px 18px",
    fontFamily:"'IBM Plex Mono',monospace",marginBottom:"20px",transition:"all 0.2s"},
  mktCats:{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px"},
  mktCat:{padding:"6px 14px",background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.07)",borderRadius:"100px",
    color:"#4a4868",cursor:"pointer",fontSize:"12px",
    fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,transition:"all 0.18s"},
  mktCatOn:{background:"rgba(232,197,71,0.1)",borderColor:"rgba(232,197,71,0.35)",color:"#e8c547"},
  mktGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:"14px"},
  mktCard:{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",
    borderRadius:"12px",padding:"20px",transition:"border-color 0.2s"},
  mktCardHead:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"},
  mktBadges:{display:"flex",gap:"6px"},
  aiBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",padding:"3px 8px",
    background:"rgba(232,197,71,0.1)",borderRadius:"4px",color:"#e8c547"},
  catBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",padding:"3px 8px",
    background:"rgba(255,255,255,0.05)",borderRadius:"4px",color:"#5a5878"},
  freeBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",color:"#4ade80"},
  mktTitle:{fontFamily:"'Instrument Sans',sans-serif",fontSize:"15px",fontWeight:700,
    color:"#e0ddf4",marginBottom:"8px",lineHeight:1.3},
  mktMeta:{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#3a3858",marginBottom:"14px"},
  mktBtns:{display:"flex",gap:"8px"},
  previewBtn:{flex:1,padding:"8px",background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.09)",borderRadius:"7px",
    color:"#5a5878",cursor:"pointer",fontSize:"12px",
    fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,transition:"all 0.18s"},
  useBtn:{flex:2,padding:"8px",
    background:"linear-gradient(135deg,rgba(232,197,71,0.18),rgba(200,149,32,0.18))",
    border:"1px solid rgba(232,197,71,0.3)",borderRadius:"7px",
    color:"#e8c547",cursor:"pointer",fontSize:"12px",
    fontFamily:"'Instrument Sans',sans-serif",fontWeight:700,transition:"all 0.18s"},
  preview:{marginTop:"14px",padding:"14px",background:"rgba(0,0,0,0.3)",
    borderRadius:"8px",fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",
    color:"#6a6888",lineHeight:"1.75",borderLeft:"2px solid rgba(232,197,71,0.3)"},
  empty:{textAlign:"center",padding:"60px",color:"#2a2840",
    fontFamily:"'IBM Plex Mono',monospace",fontSize:"13px"},
  footer:{position:"relative",zIndex:10,textAlign:"center",padding:"24px",
    color:"#1e1e2e",fontSize:"11px",fontFamily:"'IBM Plex Mono',monospace",
    borderTop:"1px solid rgba(255,255,255,0.03)"},
};
