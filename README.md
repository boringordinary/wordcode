# @boringordinary/wordcode

Human-readable, crypto-secure verification codes. Three random words instead of six random digits.

```
maple-river-sunset
```

## Why?

A 6-digit PIN has 1 million possible combinations. That sounds like a lot, but it's not — and it's hostile to humans. People misread digits, fumble between screens, and can't remember `482916` long enough to type it.

**wordcode** generates three common English words from a curated 1,000-word list. That's **1 billion combinations** — 1,000x stronger than a 6-digit OTP — and you can actually remember `maple-river-sunset` while you switch tabs.

| | 6-digit PIN | 3-word code |
|---|---|---|
| Combinations | 1,000,000 | 1,000,000,000 |
| Relative strength | 1x | **1,000x** |
| Example | `482916` | `maple-river-sunset` |
| Memorable? | No | Yes |
| Easy to type? | Depends | Yes |
| Read aloud? | Awkward | Natural |

## Install

```bash
bun add @boringordinary/wordcode  # or npm, yarn, pnpm
```

## Usage

```ts
import { generate } from "@boringordinary/wordcode";

generate();        // "maple-river-sunset"
generate(4);       // "maple-river-sunset-bold"
generate(2);       // "maple-river"
generate(3, " ");  // "maple river sunset"
```

### With Better Auth

```ts
import { emailOTP } from "better-auth/plugins/email-otp";
import { generate } from "@boringordinary/wordcode";

emailOTP({
  generateOTP: generate,
  expiresIn: 300,
});
```

### Access the word list

```ts
import { words } from "@boringordinary/wordcode";

console.log(words.length); // 1000
```

## How it works

1. Picks `count` random indices using `crypto.getRandomValues()` (Web Crypto API)
2. Maps each index to a word from the 1,000-word list
3. Joins with the separator (default: `-`)

The word list is curated for:
- **Readability** — common English words, 3–7 letters, no jargon
- **Memorability** — concrete nouns, simple verbs, familiar adjectives
- **Unambiguity** — no homophones, no confusable spellings
- **Safety** — no offensive or sensitive words

## Security

| Words | Combinations | Equivalent PIN |
|---|---|---|
| 2 | 1,000,000 | 6 digits |
| 3 | 1,000,000,000 | ~10 digits |
| 4 | 1,000,000,000,000 | ~13 digits |

Three words is the sweet spot for OTPs: strong enough for any reasonable expiry window, easy enough to type without friction.

Uses `crypto.getRandomValues()` — available in Node.js, Bun, Deno, and all modern browsers. No custom PRNG, no `Math.random()`.

## License

MIT
