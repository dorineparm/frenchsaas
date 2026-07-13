---
title: "French localization for SaaS: What actually makes or breaks it"
description: "A practical, no-fluff guide to localizing your SaaS into French:
  the plural traps, the tu/vous decision, text expansion, ICU strings and legal
  copy that separate a translated product from a native one."
pubDate: 2026-07-13
tag: Localization
---
Search "French localization" and you'll find the same article a dozen times: 320 million French speakers, France vs Quebec, don't translate idioms, mind the Toubon Law. All true. All so broad it doesn't help you ship anything.
So let's do the opposite. This is the version I'd give a product team actually localizing a SaaS into French (what genuinely makes or breaks it) from someone who does the work rather than sells the package. It's narrower on purpose, and more useful for it.

## Start with one market, and be honest about which

French isn't one language-fits-all. France, Belgium, Switzerland, Quebec and Francophone Africa each have their own vocabulary, formatting conventions, and sometimes their own legal requirements. None is the "real" French, they're parallel, equally legitimate varieties, and a Québécois or a Belgian reader spots a France-centric text as fast as a French reader spots a machine-translated one.

The generic advice is "consider regional variations." The practical advice is sharper: pick the market your users are actually in, and commit to it. **Where are your customers, or the ones you're trying to win?** That's your primary variety. Build for it specifically rather than aiming at a vague, placeless "French" that belongs to no one and reads as native to no one.

Trying to serve every French variety at once dilutes all of them. Choose deliberately, do it well, and expand to other markets as distinct targets when the time comes.

A quick example. A Québécois user "magasine" (shops); a French user "fait ses achats." A French user parks in a "parking"; a Québécois in a "stationnement." Neither is more correct, but a product that mixes them feels like it can't decide who it's talking to. The goal isn't to crown one variety; it's to pick yours and be consistent.

## The plural trap that breaks French UIs

Here's the one almost every English-built product gets wrong, and it's invisible until a French user sees it.
English has two plural forms: one and other. French treats zero as singular: "0 article", not "0 articles". If your code hard-codes an "s" or copies English plural logic, your French UI will proudly display "1 articles" and "0 articles", and every French speaker will notice.

**Concretely:**

English: `0 items`, `1 item`, `2 items`
Naive French: `0 articles`, `1 articles`, `2 articles` ← the first two are wrong
Correct French: `0 article`, `1 article`, `2 articles`

This is why ICU MessageFormat matters. It lets the target language define its own plural categories instead of inheriting English ones. If your strings expose plurals properly, French can be correct at 0, 1, and beyond. If they don't, no amount of good translation fixes it. The bug is in the architecture, not the words...

Why I bring this up first. This is the error I catch most often, and it's never the translator's fault: it's baked into the code before anyone translates a word. It's the clearest proof that localization has to start before translation, not after.

## Tu or vous is a brand decision, not a translation one

English has no equivalent, so teams underestimate it: French forces you to choose a formality register, and that choice colors your entire product voice.

> Vous — the safe, professional default for B2B SaaS. Respectful, a little formal, hard to get wrong.
> Tu — younger, casual, community-driven products. Warmer, but riskier if your audience skews professional.

Neither is "more correct", but inconsistency is always wrong. The failure mode isn't picking the wrong one; it's picking both by accident, so your onboarding says tu, your billing emails say vous, and your product feels like it was written by three different people. Decide once, document it, enforce it everywhere.

Seen in the wild. A product whose signup flow greeted users with a friendly "Crée ton compte" (tu); then, two screens later, "Veuillez confirmer votre adresse" (vous). Same user, same session, two personalities. Small thing; it quietly erodes trust exactly where you're asking someone to commit.

## French runs long — and your layout has to survive it

English to French expands 15–25% on average. A button sized for English overflows in French.

A few that catch teams out:

> "Save" → "**Enregistrer**" (nearly double)
> "Wishlist" → "**Ajouter à ma liste de souhaits**" (from 8 characters to 30)
> "Settings" → "**Paramètres**"
> "Buy now" → "**Acheter maintenant**"

This isn't a translation problem you can write your way out of — it's a design constraint that has to be planned for. The fix is boring and essential: flexible components, tested with real French strings, before launch rather than after a bug report.

## The legal copy is not just more strings

Consent flows, privacy notices, cookie banners, terms, under the GDPR and French practice (shaped by the [CNIL](https://www.cnil.fr/en)), these carry legal weight, and the wording is part of the compliance, not decoration on top of it.

The GDPR requires consent to be freely given, specific, informed and unambiguous. A vague or machine-flavored French consent line can undermine the validity of the consent itself, regardless of whether the underlying data practice was sound.

The distinction that matters. Your legal team owns what must be said; a good localizer makes sure the French wording of it is clear and correct. Two different jobs, and the fastest way to a compliance headache is treating a consent banner like just another button label in the string queue.

## Typography is small, visible, and constantly botched

French uses a space before high punctuation `( ; : ! ? )` and its own quotation marks, the guillemets `« »`.
Machine translation and English-built systems skip these constantly. So you get `Prêt?` instead of `Prêt ?`, or straight `"quotes"` instead of `« guillemets »`. Individually tiny; collectively, they're the difference between text that looks native and text that looks foreign.

The tell. A French reader clocks a missing space before a question mark instantly, even if they couldn't name the rule. It reads as off before they consciously know why. That subliminal "something's not right" is exactly what you're paying to avoid.

## What actually separates a translated product from a localized one

Every point above shares a theme: the failures aren't about vocabulary. They're about plural logic, formality consistency, layout, legal nuance, and formatting… decisions that a word-for-word translation can't make and a spreadsheet full of strings can't capture.

That's the real distinction. Translation converts your words. Localization makes a hundred small expert calls so the result reads like it was built in French, not shipped through it. And that's the part the generic guides can't give you, because it isn't a checklist: it's judgment, applied string by string, by someone who knows where French breaks!

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\__

I localize SaaS, tech and gaming products into French — the plurals, the tone, the legal copy, the typography, done right the first time. If you're bringing a product to the French market, let's talk!
