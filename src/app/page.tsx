import {
  projects,
  experiences,
  education,
  openSource,
  programs,
  contactItems,
} from "@/lib/portfolio-data";
import NavBar from "@/components/NavBar";
import ContactLinks from "@/components/ContactLinks";
import ProjectSlider from "@/components/ProjectSlider";
import { posts } from "@/lib/blog-data";

/* Shared ink-link treatment: underline that inverts on hover */
const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 w-full py-16 sm:py-20 md:py-24">
        <div className="max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10">
        {/* Terminal Header */}
        <p
          id="top"
          className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight"
        >
          {">_ "}mohar@portfolio:~$
        </p>

        {/* Hero */}
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black leading-[1.1] tracking-[-0.01em] mb-6">
          Mohar Das<span className="text-foreground">.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/90">
          I build and investigate AI systems at the intersection of engineering
          and research, with a focus on LLM reasoning, retrieval, knowledge
          representation, and reliable AI. I enjoy taking ideas from research
          papers, implementing them from scratch, stress-testing their
          assumptions, and turning what I learn into practical systems and
          experiments.
        </p>

        {/* Contact — first thing visitors see */}
        <ContactLinks items={contactItems} />

        {/* Blog preview */}
        <div className="mt-14">
          <p className="font-mono text-sm uppercase tracking-widest text-foreground/60">
            blog
          </p>
          <ul className="mt-3 space-y-2 text-lg sm:text-xl leading-[1.65]">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug} className="flex flex-col gap-y-0.5">
                <a href={`/blog/${post.slug}`} className={ink}>
                  {post.title}
                </a>
                <span className="font-mono text-sm sm:text-base text-foreground/50">
                  ↳ {post.date}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <a href="/blog" className={ink}>
              all posts ↗
            </a>
          </p>
        </div>

        {/* 01. Projects */}
        <h2 id="projects" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          01. projects
        </h2>
        </div>

        {/* Full-bleed: the slider spans the viewport, everything else stays in the column */}
        <ProjectSlider projects={projects} />

        <div className="max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10">
        {/* 02. Experience */}
        <h2 id="experience" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          02. experience
        </h2>
        <div className="mt-8 space-y-4">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="rounded-lg border border-foreground/15 p-5 transition-colors duration-150 hover:border-foreground/40"
            >
              <h3 className="text-[1.1rem] sm:text-[1.15rem] font-bold leading-snug">
                {exp.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-foreground/60">
                {exp.company} <span className="text-foreground/40">·</span>{" "}
                {exp.period} <span className="text-foreground/40">⏵</span>{" "}
                {exp.location}
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-foreground/70">
                {exp.description}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-[1.6] text-foreground/70 marker:text-foreground/30">
                {exp.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* 03. Education */}
        <h2 id="education" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          03. education
        </h2>
        {education.map((edu) => (
          <article className="mt-8" key={edu.school}>
            <h3 className="text-[1.2rem] sm:text-[1.3rem] font-bold leading-snug">
              {edu.title}
            </h3>
            <p className="font-mono text-sm sm:text-base text-foreground/60 mt-1">
              {edu.period} ⏵ {edu.school}
            </p>
            <p className="mt-3 font-mono text-sm sm:text-base text-foreground/60">
              {edu.coursework.join(" · ")}
            </p>
          </article>
        ))}

        {/* 04. Open Source */}
        <h2 id="opensource" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          04. open source
        </h2>
        <p className="mt-8 font-mono text-sm sm:text-base text-foreground/80">
          {openSource.metrics.map((metric, i) => (
            <span key={metric.label}>
              {i > 0 && <span className="text-foreground/40"> / </span>}
              <span className="font-black text-foreground">{metric.value}</span>{" "}
              {metric.label.toLowerCase()}
            </span>
          ))}
        </p>

        <p className="font-mono text-sm uppercase tracking-widest text-foreground/60 mt-10">
          pull requests
        </p>
        <ul className="mt-4 space-y-3 text-lg sm:text-xl leading-[1.65]">
          {openSource.prs.map((pr) => (
            <li key={pr.url} className="flex flex-col gap-y-0.5">
              <a href={pr.url} target="_blank" rel="noreferrer" className={ink}>
                {pr.title}
              </a>
              <span className="font-mono text-sm sm:text-base text-foreground/50">
                ↳ {pr.repo}
              </span>
            </li>
          ))}
        </ul>

        <p className="font-mono text-sm uppercase tracking-widest text-foreground/60 mt-10">
          issues
        </p>
        <ul className="mt-4 space-y-3 text-lg sm:text-xl leading-[1.65]">
          {openSource.issues.map((issue) => (
            <li key={issue.url} className="flex flex-col gap-y-0.5">
              <a
                href={issue.url}
                target="_blank"
                rel="noreferrer"
                className={ink}
              >
                {issue.title}
              </a>
              <span className="font-mono text-sm sm:text-base text-foreground/50">
                ↳ {issue.repo}
              </span>
            </li>
          ))}
        </ul>

        {programs.map((program) => (
          <article
            key={program.name}
            className="mt-10 rounded-lg border border-foreground/15 p-5 transition-colors duration-150 hover:border-foreground/40"
          >
            <h3 className="text-[1.1rem] sm:text-[1.15rem] font-bold leading-snug">
              {program.name}
            </h3>
            <a
              href={program.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block font-mono text-sm text-foreground/50 transition-colors duration-150 hover:text-foreground"
            >
              ↗ github.com/the-boring-education
            </a>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-foreground/70">
              {program.description}
            </p>
            <ul className="mt-3 space-y-2">
              {program.items.map((item) => (
                <li key={item.url} className="flex flex-col gap-y-0.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${ink} text-[0.95rem] leading-[1.6]`}
                  >
                    {item.title}
                  </a>
                  <span className="font-mono text-xs text-foreground/50">
                    ↳ {item.repo}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-foreground/10 mt-auto pb-24 sm:pb-28">
        <div className="max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10 py-8 sm:py-10 flex justify-center">
          <p className="text-sm text-foreground/50">© 2026 mohar das</p>
        </div>
      </footer>

      <NavBar />
    </div>
  );
}