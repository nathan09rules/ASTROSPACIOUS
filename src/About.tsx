import React, { useState } from "react";
import Space_bg from "./Extra/Space-bg.tsx";

import './css/base.css';
import './css/About.css';

const cards = [
    { title: "Webinars", content: "Join our expert-led webinars to explore the latest in astronomy and space science. Engage with professionals and enthusiasts alike!" },
    { title: "Workshops", content: "Participate in hands-on workshops designed to deepen your understanding of astrophysics, telescope operation, and space exploration technologies." },
    { title: "Community Events", content: "Connect with fellow space enthusiasts through our community events. Share your passion, learn from others, and contribute to our growing community." }
    //{ title: "DataBase", content: "Research to your hearts content with our website formulated by student for students. All material is certified by experts and credible sources." }

];

const team = {
    "heads": [
        { name: "Anvita Srivastava", role: "Founder", img: "" },
        { name: "Nathan Dsouza", role: "Head Developer", img: "" },
        { name: "Vivaan", role: "Head Marketer", img: "" }
    ],

    "members": [
        { name: "Anvita Srivastava", role: "Founder", img: "" },
        { name: "Nathan Dsouza", role: "Head Developer", img: "" },
        { name: "Vivaan", role: "Head Marketer", img: "" }
        , { name: "Anvita Srivastava", role: "Founder", img: "" },
        { name: "Nathan Dsouza", role: "Head Developer", img: "" },
        { name: "Vivaan", role: "Head Marketer", img: "" }
        , { name: "Anvita Srivastava", role: "Founder", img: "" },
        { name: "Nathan Dsouza", role: "Head Developer", img: "" },
    ]
}

const timeline = [
    { year: "2022", events: ["Founded ASTROSPACIOUS", "Hosted first webinar on 'The Wonders of the Universe'"] },
    { year: "2023", events: ["Invited Professionals to present topics and guide our team " , "Started more collaborations"] },
    { year: "2023", events: ["Launched interactive workshops on telescope usage", "Expanded community events to include stargazing nights"] },
    { year: "2024", events: ["Introduced advanced webinars on astrophysics", "Collaborated with local observatories for exclusive events"] }
];

function About() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const segmentWidth = rect.width / cards.length;
        const newIndex = Math.floor(x / segmentWidth);
        setActiveIndex(newIndex);
    }

    return (
        <main>
            <Space_bg />
            <h1 className="gradient textclip centered margin-vertical">Welcome to ASTROSPACIOUS</h1>

            <br className="margin-vertical"></br>

            <div className="info centered"><div className="inner"><h3>About Astrospacious:
Astrospacious is a student-driven space education and research initiative created to make astronomy and aerospace learning more accessible, practical, and exciting for young minds. 
Our team works on research projects, educational content, and collaborative experiments that bring real-world space science closer to students. We focus on learning by doing — sharing knowledge, building together, and encouraging questions that go beyond the textbook.
</h3></div></div>
            <div className="Hover-Board margin-vertical" onMouseMove={handleMouseMove}>
                {cards.map((card, index) => {
                    let className = "card";

                    if (index === activeIndex) {
                        className += " active";

                        if (index === 0) className += " leftmost";
                        else if (index === cards.length - 1) className += " rightmost";
                    }
                    else if (index < activeIndex) className += " left inactive";
                    else if (index > activeIndex) className += " right inactive";

                    return (
                        <div key={index} className={className}>
                            <h2 className="card-title">{card.title}</h2>
                            <p className="card-content">{card.content}</p>
                        </div>
                    )
                })}
            </div>

            <br className="margin-vertical"></br>

            <h1 className="gradient textclip centered margin-vertical">Meet our team</h1>
            <div className="team">
                <div className="Heads margin-vertical">
                    {team.heads.map((member, index) => (
                        <div key={index} className="centered">
                            <img className="image glow glow-hover"></img>
                            <h2 className="name">{member.name}</h2>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
                <div className="Members margin-vertical">
                    {team.members.map((member, index) => (
                        <div key={index} className="centered">
                            <img className="image glow glow-hover"></img>
                            <h2 className="name">{member.name}</h2>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            <br className="margin-vertical"></br>

            <section className="mission-vision">
                <div className="mission">
                    <h1 className="gradient-text centered">Our Mission</h1>
                    <h2>
                        To inspire and educate students about astronomy and space science through interactive webinars, workshops, and community events.
                    </h2>
                </div>
                <div className="vision">
                    <h1 className="gradient-text centered">Our Vision</h1>
                    <h2>
                        To become a leading platform that connects space enthusiasts worldwide and fosters a passion for exploring the universe.
                    </h2>
                </div>
            </section>

<section className="timeline">
    <h1 className="gradient-text centered">Our Journey So Far</h1>

    <div className="timeline-container">
        {timeline.map((item, index) => (
            <div key={index} className={`timeline-row ${index % 2 === 0 ? "left" : "right"}`}>
                <div className="timeline-card glow glow-hover">
                    <h2 className="year">{item.year}</h2>
                    <ul>
                        {item.events.map((ev, i) => (
                            <li key={i}>{ev}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>
</section>

        </main>
    )
}

export default About;
