import {
  projects,
  experiences,
  education,
  openSource,
  contactItems,
} from "@/lib/portfolio-data";
import NavBar from "@/components/NavBar";
import ContactLinks from "@/components/ContactLinks";

/* Shared ink-link treatment: underline that inverts on hover */
const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
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
        <p className="text-lg sm:text-xl leading-relaxed text-foreground/80">
          AI Engineer &amp; Researcher — Retrieval Systems &amp; Agentic AI.
        </p>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/90">
          Researching <em>neuro-symbolic</em> architectures at Azmth Lab.
          Available full-time, immediate start — open to remote roles.
        </p>

        {/* Contact — first thing visitors see */}
        <ContactLinks items={contactItems} />

        {/* 01. Projects */}
        <h2 id="projects" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          01. projects
        </h2>
        {projects.map((project, i) => (
          <article className="mt-8 first:mt-10" key={project.title}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-[1.2rem] sm:text-[1.3rem] font-bold leading-snug">
                {project.title}
              </h3>
              {project.badge && (
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-foreground/50">
                  ⏵ {project.badge.toLowerCase()}
                </span>
              )}
            </div>
            <p className="mt-2 text-lg sm:text-xl leading-[1.65] text-foreground/90">
              {project.description}
            </p>
            <p className="mt-3 font-mono text-sm sm:text-base text-foreground/60">
              {project.tags.join(" / ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={ink}
                >
                  {link.external ? "↗ " : ""}
                  {link.label.toLowerCase()}
                </a>
              ))}
            </div>
          </article>
        ))}

        {/* 02. Experience */}
        <h2 id="experience" className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mt-16 sm:mt-24">
          02. experience
        </h2>
        {experiences.map((exp) => (
          <article className="mt-8" key={exp.company}>
            <h3 className="text-[1.2rem] sm:text-[1.3rem] font-bold leading-snug">
              {exp.title} — {exp.company}
            </h3>
            <p className="font-mono text-sm sm:text-base text-foreground/60 mt-1">
              {exp.period} ⏵ {exp.location}
            </p>
            <p className="mt-3 text-lg sm:text-xl leading-[1.65] text-foreground/90">
              {exp.description}
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-lg sm:text-xl leading-[1.65] text-foreground/90">
              {exp.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}

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
            <p className="mt-3 text-lg sm:text-xl leading-[1.65] text-foreground/90">
              {edu.description}
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
          <span className="font-black text-foreground">
            {openSource.metrics[0].value}
          </span>{" "}
          pull requests{" "}
          <span className="text-foreground/40">/</span>{" "}
          <span className="font-black text-foreground">
            {openSource.metrics[1].value}
          </span>{" "}
          issues opened{" "}
          <span className="text-foreground/40">/</span>{" "}
          <span className="font-black text-foreground">
            {openSource.metrics[2].value}
          </span>{" "}
          repos{" "}
          <span className="text-foreground/40">/</span>{" "}
          <span className="font-black text-foreground">
            {openSource.metrics[3].value}
          </span>{" "}
          followers
        </p>

        <p className="font-mono text-sm uppercase tracking-widest text-foreground/60 mt-10">
          contributions
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