---
title: "ICU MessageFormat and French plurals: a survival guide for dev teams"
description: "French plural rules don't map onto English ones. A practical walkthrough of writing localizable strings your French linguist won't have to fight."
pubDate: 2026-04-22
tag: "Engineering"
---

French plural rules don't map onto English ones — and gendered agreement makes naive placeholder strings break in ways your QA won't catch.

## The classic trap

```
{count, plural, one {# item} other {# items}}
```

In French, `0` takes the singular (« 0 élément »), unlike English. If your code assumes English plural categories, your French UI is wrong on day one.

## Three rules for localizable strings

1. **Never concatenate.** Sentence order changes between languages.
2. **Give every placeholder a meaningful name** — `{userName}` not `{0}`.
3. **Let the linguist own the plural logic.** ICU exists precisely so the target language can define its own categories.

*This is a sample article — replace it with your own from the /admin interface.*
