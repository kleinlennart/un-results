import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { footerLinkStyle, linkStyle } from "@/lib/site";

export const metadata: Metadata = {
  title: "resources",
};

const resources = [
  {
    heading: "definitions",
    items: [
      {
        title: "Results-Based Management Handbook",
        source: "UN Development Group, 2011",
        href: "https://unsdg.un.org/sites/default/files/UNDG-RBM-Handbook-2012.pdf",
      },
      {
        title:
          "Glossary of Key Terms in Evaluation and Results-Based Management",
        source: "OECD, 2023",
        href: "https://doi.org/10.1787/632da462-en-fr-es",
      },
    ],
  },
  {
    heading: "mandates",
    items: [
      {
        title: "Results-based budgeting",
        source: "General Assembly, A/RES/55/231",
        href: "https://docs.un.org/en/A/RES/55/231",
      },
      {
        title: "Quadrennial comprehensive policy review",
        source: "General Assembly, A/RES/71/243",
        href: "https://docs.un.org/en/A/RES/71/243",
      },
    ],
  },
  {
    heading: "reviews",
    items: [
      {
        title: "Review of results-based management at the United Nations",
        source: "Office of Internal Oversight Services, A/63/268, 2008",
        href: "https://docs.un.org/en/A/63/268",
      },
      {
        title:
          "Results-Based Management in the United Nations Development System: Progress and Challenges",
        source: "Report prepared for UN DESA, 2012",
        href: "https://www.un.org/esa/coordination/pdf/rbm_report_10_july.pdf",
      },
      {
        title:
          "Results-based management in the United Nations development system",
        source: "Joint Inspection Unit, JIU/REP/2017/6",
        href: "https://www.unjiu.org/sites/www.unjiu.org/files/jiu_rep_2017_6_english__0.pdf",
      },
      {
        title: "High-impact model for results-based management",
        source: "Joint Inspection Unit, JIU/NOTE/2017/1",
        href: "https://www.unjiu.org/sites/www.unjiu.org/files/jiu_note_2017_1_english_0.pdf",
      },
      {
        title:
          "Comments of the Secretary-General and the Chief Executives Board on the JIU report",
        source: "A/72/809/Add.1, 2018",
        href: "https://www.unjiu.org/sites/www.unjiu.org/files/a_72_809_add.1_english.pdf",
      },
    ],
  },
];

export default function Resources() {
  return (
    <>
      <main className="flex flex-1 items-center px-4 py-16">
        <div className="mx-auto w-full max-w-prose space-y-10 text-sm leading-relaxed">
          {resources.map(({ heading, items }) => (
            <section key={heading} className="space-y-3">
              <h2 className="text-xs text-muted-foreground">{heading}</h2>
              <ul className="space-y-3">
                {items.map(({ title, source, href }) => (
                  <li key={href}>
                    <a className={linkStyle} href={href}>
                      {title}
                    </a>
                    <p className="text-xs text-muted-foreground">{source}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer>
        <span />
        <Link className={footerLinkStyle} href="/about">
          back
        </Link>
      </Footer>
    </>
  );
}
