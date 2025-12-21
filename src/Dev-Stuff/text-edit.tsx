import { useState, useEffect, useRef } from "react";

interface Card {
  id: string;
  title: string;
}

export default function TextEdit() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<Card[]>([{ id: "section-1", title: "" }]);
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });

  // Refs for editor divs
  const editorRefs = useRef<HTMLDivElement[]>([]);

  const slug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "-");

  const insertCardAfter = (i: number) => {
    setCards((cards) => {
      const copy = [...cards];
      copy.splice(i + 1, 0, { id: `section-${cards.length + 1}`, title: "" });
      return copy;
    });
  };

  const cmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateActive();
  };

  const updateActive = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActive);
    return () => document.removeEventListener("selectionchange", updateActive);
  }, []);

  const insertImageLink = (cardIndex: number) => {
    const url = prompt("Enter image URL");
    if (!url) return;
    const editor = editorRefs.current[cardIndex];
    if (editor) {
      const img = document.createElement("img");
      img.src = url;
      img.style.maxWidth = "100%";
      img.style.display = "block";
      img.style.marginTop = "8px";
      editor.appendChild(img);
    }
  };

  const exportJSON = () => {
    if (!topic.trim()) return alert("Set TOPIC first");
    const data: any = {
      [slug(topic)]: cards.map((card, i) => ({
        id: slug(card.title || `section-${i + 1}`),
        title: card.title ?? "",
        content: editorRefs.current[i]?.innerHTML ?? "",
      })),
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("JSON copied to clipboard");
  };

  return (
    <main className="Text">
      <style>{`
        .card-group { margin: 32px; width: 80%; }
        .subject-card { width: 100%; margin: auto; padding: 15px; border: 1px solid black; }
        .header-row { display: flex; gap: 10px; align-items: center; }
        .editor { min-height: 90px; padding: 8px; border: 1px solid #aaa; margin-top: 8px; outline: none; white-space: pre-wrap; }
        .card-controls { width: 80%; margin: 8px auto 0; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .format-bar { display: flex; gap: 6px; flex-wrap: wrap; }
        .format-bar button { width: 32px; height: 32px; font-weight: bold; }
        .active { background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); color: white; }
        .export-box { width: 80%; margin: 40px auto; text-align: center; }
        .Topic { width: 80%; margin: 20px auto; padding: 8px; font-size: 18px; display: block; }
        .editor img { max-width: 100%; display: block; margin-top: 8px; }
      `}</style>

      <div className="main centered">
        {/* Topic input */}
        <input
          className="Topic"
          placeholder="TOPIC"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* Cards */}
        {cards.map((card, i) => (
          <div key={card.id} className="card-group">
            {/* === Line 107: subject-card with proper callback ref === */}
            <div
              className="subject-card"
              ref={(el) => {
                if (el) editorRefs.current[i] = el;
              }}
            >
              <div className="header-row">
                <div className="card-num">{i + 1}</div>
                <input
                  className="card-title"
                  placeholder="Title"
                  value={card.title}
                  onChange={(e) =>
                    setCards((cards) =>
                      cards.map((c) =>
                        c.id === card.id ? { ...c, title: e.target.value } : c
                      )
                    )
                  }
                />
              </div>
              <div
                className="editor"
                contentEditable
                suppressContentEditableWarning
                ref={(el) => {
                  if (el) editorRefs.current[i] = el;
                }}
              />
            </div>

            {/* Card controls */}
            <div className="card-controls">
              <div className="format-bar">
                <button
                  className="centered"
                  style={{ width: "80px" }}
                  onClick={() => insertCardAfter(i)}
                >
                  ADD
                </button>
                <button
                  className={`centered ${active.bold ? "active" : ""}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    cmd("bold");
                  }}
                >
                  B
                </button>
                <button
                  className={`centered ${active.italic ? "active" : ""}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    cmd("italic");
                  }}
                >
                  I
                </button>
                <button
                  className={`centered ${active.underline ? "active" : ""}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    cmd("underline");
                  }}
                >
                  U
                </button>
                <input type="color" onChange={(e) => cmd("foreColor", e.target.value)} />
                <button className="centered" onClick={() => insertImageLink(i)}>
                  IMG
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Export */}
        <div className="export-box">
          <button onClick={exportJSON}>EXPORT TO JSON (copy)</button>
        </div>
      </div>
    </main>
  );
}
