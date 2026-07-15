---
title: "The SaaS Localization Playbook: From One Language to Many"
description: "Why and how to localize your SaaS into multiple languages: the
  strategy, the technical setup (i18n, ICU, pipelines), the common traps, and
  how to do it right. A practical, no-fluff guide for product teams."
pubDate: 2026-07-15
tag: Localization, SaaS
---
Your SaaS works. People are paying for it. And then you look at your analytics and notice a quarter of your signups come from countries where English isn't the first language, and most of them churn before day seven.
That's not a coincidence. It's a translation problem wearing a retention costume.

This guide walks through why translating your SaaS into multiple languages is worth it, and (the harder part) how to do it without shipping the kind of broken, half-translated product that makes users trust you less than if you'd stayed English-only. It's long, because doing this properly has a lot of moving parts. Grab a coffee.

🎵 [May I offer you some lo-fi for your read?](https://youtu.be/SNzRALm3k00?si=dBb7jBNvu7tOPRXi)

## Part 1: Why bother?

Let's get the business case out of the way, because "it feels international" is not a reason to spend money.
People buy in their own language. This is the least surprising finding in the history of market research, and yet: a large majority of shoppers prefer to buy in their native language, and a striking share simply won't purchase from a site in a language they don't speak. Your English-only checkout isn't neutral to a German or Japanese user: it's a small, constant friction, and friction is where conversions go to die.

Your competitors are probably still English-only. In a lot of SaaS categories, localization is the thing everyone agrees is important and nobody has gotten around to. Being the product that actually speaks a market's language is a genuine edge, sometimes the deciding one.

**Support costs drop.** Users who understand your product raise fewer tickets, file fewer "how do I even" complaints, and rage-quit less. Localization quietly pays for itself on the support side.

**Search visibility multiplies.** Every language you localize is a new set of keywords, a new market's Google, and increasingly a new audience of people asking AI assistants for recommendations in their own language. Content that only exists in English is invisible to all of them.

**A reality check.** None of this means "translate into 30 languages tomorrow." The most common localization mistake isn't translating badly: it's translating *too much*, *too fast*, into markets you haven't validated. More on that in a second.

## Part 2: Which languages, and in what order?

Here's where teams either overthink it or don't think at all.

Don't start with "the biggest languages." Start with your data. Where are your signups, your trials, your churned users, your support tickets coming from? Which markets are converting despite the language barrier — because those are the ones that'll explode once you remove it?

### A sane order of operations:

**Look at your traffic and revenue by country.** Follow the money and the momentum.

**Pick one or two languages to start.** Not ten. One or two.

**Localize fully for those, learn, then expand.** A product beautifully localized into two languages beats one clumsily machine-translated into twelve.

**The "we'll just add every language" trap**. A team once proudly told me they supported 15 languages. I clicked into three of them. All 15 shared the same broken plural strings, the same untranslated error messages, and my personal favorite: a German UI where every button had burst its container like an overstuffed suitcase. Fifteen languages, zero of them actually finished. Depth beats breadth.

## Part 3: The technical foundation (do this before you translate a word)

This is the part teams skip, and it's the part that determines whether the whole project succeeds. Most localization disasters are baked in before a single word is translated. They live in the code.

Externalize your strings. If text is hard-coded in your components, localization is impossible. Full stop. Every user-facing string needs to live in resource files (JSON, PO, XLIFF, whatever your stack uses), separated from your code. This is called internationalization (i18n), and it's the groundwork translation sits on.

Use ICU MessageFormat for anything with a number, plural, or gender. This is the big one. Different languages have wildly different plural rules. English has two forms (one / other). French treats zero as singular. Polish has four plural categories. Arabic has six. If your code hard-codes "add an s," you will be wrong in most of the world's languages.

**Here's the same string done wrong and right:**

> Hard-coded English logic: 3 fichiers, 1 fichiers ← the second is wrong in French
>
> ICU, letting the language decide: 3 fichiers, 1 fichier ← correct, because French owns its own rules

* **Plan for text expansion.** Translated text changes length, sometimes dramatically. German and Finnish love to expand; a tidy English button can become a compound word of alarming length. French runs 15–25% longer on average. If your layout was pixel-tuned for English, it will break.
* Design flexible components and test them with real translated strings, not "`Lorem ipsum.`"

### The text-expansion tax, illustrated.

English "`Save`" → French "`Enregistrer`" → German "`Speichern`" is manageable. But English "`Settings`" → German "`Einstellungen`", or a cheerful little "Buy now" ballooning into some languages' equivalent of "`Proceed to the completion of your purchase`", is how buttons end up with text spilling out the sides like a sandwich with too much filling (🥪).

Handle dates, numbers, and currencies properly. `03/04/2026` is `March 4th` in the US and `April 3rd` almost everywhere else. `1,000` is one thousand in English and one (with decimals) in French and German. Don't hand-roll this, use proper locale formatting. This is exactly the kind of tiny, invisible detail that screams "we didn't really think about you" to a local user.

Support right-to-left if it's on your roadmap. Arabic and Hebrew flip your entire layout. If those markets are even a maybe, it's far cheaper to keep your CSS RTL-aware from the start than to retrofit it later.

## Part 4: Translation vs. localization (they are not the same word twice)

Here's the distinction that separates products that feel foreign from products that feel native.
Translation converts your words. Localization adapts your product so it feels like it was built for that market. Translation is a subset of localization, a necessary part, but not the whole job.

Localization also means:

* **Tone and formality.** Many languages force a choice English doesn't. French has tu vs vous; German has du vs Sie. Pick one, stay consistent, and know that the choice defines your entire brand voice in that language.
* **Cultural adaptation.** Idioms, humor, examples, imagery, color associations, even your placeholder names ("John Doe" means nothing in Tokyo).
* **Legal and formatting conventions.** Privacy copy, consent flows, address formats, phone number formats — all local.
* **CTAs that persuade, not translate.** "Get started" doesn't always have a natural equivalent. A good localizer rewrites it to land, rather than translating it into something grammatically correct and emotionally dead.

Why this matters more than teams expect. A word-for-word translation is often grammatically perfect and completely lifeless, the linguistic equivalent of a hotel breakfast. Technically food. Nobody's excited (unless you're in Scotland and get served a *full Scottish*. Please, please try those!).

Localization is what makes your product sound like a human who actually lives in that market wrote it.

## Part 5: How to actually get it translated

You've got options, and they exist on a spectrum from "fast and risky" to "slow and excellent."

**Machine translation (DeepL, Google Translate).** Fast, cheap, and fine for a rough internal draft or low-stakes content. As your public-facing product's final voice? It's a gamble, MT still fumbles context, tone, plurals, and the exact nuances that make copy feel native. Users notice. They mention it in reviews. Not the good kind.

> It also quietly hurts your SEO. Machine translation tends to produce literal, unnatural phrasing that misses how people in that market \*actually search\*, so your pages target the English keyword translated word-for-word, not the term a French user types into Google.
>
> Add the tell-tale awkwardness that both readers and search engines increasingly recognize as machine-generated, plus the risk of near-duplicate, low-quality pages across languages, and you get content that's technically "in French" but effectively invisible.
>
> And the generative engines your future customers now ask for recommendations? They cite sources that read as trustworthy and native, not ones that read like a translation memory had a rough day.

**Machine translation + human post-editing (MTPE).** MT does a first pass, a human linguist fixes it. A reasonable middle ground for large volumes, as long as the human is genuinely reviewing, not rubber-stamping.

> One honest caveat, because it matters: the working conditions around post-editing are often, frankly, questionable. In the typical agency model, linguists get stacked at the bottom of a chain of intermediaries, handed machine output to "just clean up," and paid a fraction of a translation rate for what is often harder, more draining work than translating from scratch.
>
> And here's the quiet catch: a **cost cut** on the linguist's side usually shows up as a **quality cut** on yours. The two are rarely unrelated.

So if you bring AI or MTPE into your pipeline, do it well: treat the linguist as a valued partner, not a rubber stamp at the end of a machine. Pay fairly for the real work involved, give proper context, and don't impose the race-to-the-bottom model on the person whose job is to make you sound native. Your French, and your reputation in the market, depends on them caring about the result. People who are respected tend to.

**Professional human translators / localizers.** Slower, costs more, worth it for anything users actually read and judge you by: your UI, onboarding, marketing, legal copy. This is where working with a specialist, ideally someone who knows both your domain and the target market's software conventions, makes the difference between "translated" and "native."

> What you're paying for isn't just words in another language: it's judgment. A specialist localizer catches the things no machine and no generalist will: that your cheerful onboarding tone needs \*tu\* here but your billing emails need \*vous\*, that a feature name should stay in English while its description shouldn't, that a plural will break at zero, that a CTA translated literally lands flat and needs rewriting to actually convert.
>
> They flag the string that's about to overflow your button, the date format that'll confuse half your users, the legal line that reads fine but isn't compliant. Hundreds of small, correct decisions most people never notice, which is exactly the point. Good localization is invisible. You only see it when it's missing.

**A Language Lead.** For an ongoing product (which yours is: you ship features constantly), the highest-leverage option is one person who owns a language: builds the style guide and glossary, makes the hard calls, reviews in context, and keeps everything coherent release after release. Not a one-off translation: a durable quality function.

The tooling bit, briefly. Translation Management Systems (Phrase, Lokalise, Crowdin, and friends) connect your string files to your translators, track what's changed, and let you localize continuously instead of in giant painful batches. If you're localizing an evolving product, you'll want one. Your translator will love you for it.

## Part 6: Continuous localization (because you're never "done")

Here's the thing nobody tells you: localization is not a project with an end date. It's a process.

You ship a new feature Tuesday. Now you have new strings in one language and eleven stale ones. Multiply that by every release, forever. The teams that do this well treat localization like they treat testing, a continuous part of shipping, wired into their pipeline, not a frantic scramble before each launch.

Practically: connect your repo to your TMS, flag new strings automatically, and have a standing relationship with your linguists so translations ship with features, not three sprints later.

## Part 7: A short, honest checklist

If you do nothing else from this guide, do these:

* Externalize every string. No hard-coded text.
* Use ICU MessageFormat for plurals, numbers, and gender.
* Design for text expansion. Test with real strings.
* Format dates, numbers, and currencies by locale.
* Start with one or two languages, localized fully.
* Use humans for anything users judge you by.
* Set up continuous localization so you're never scrambling.
* Decide tone once (formal vs casual) and document it.

## The bottom line

Translating your SaaS into multiple languages isn't about running your strings through a machine and hoping. It's a stack of decisions (technical, linguistic, cultural, strategic) that together determine whether a user in Paris or Berlin or Tokyo feels like your product was built for them, or merely allowed to visit.

Do it shallow, and you get fifteen half-broken languages and users who trust you less. Do it deep, and each language becomes a real market that feels at home in your product.

Start with one. Do it properly. Then do the next.

I localize SaaS products into French: the strategy, the ICU strings, the tone, the legal copy, the ongoing quality, as a French Language Lead. If French is one of the markets on your list, let's talk. And if you're localizing into other languages too, I'm well connected in the localization world and happy to point you toward people I trust.
