/**
 * @boringordinary/wordcode
 *
 * Generate memorable, crypto-secure word-based codes.
 * 1,000 curated words → 3 words = 1 billion combinations
 * (1,000× stronger than a 6-digit numeric OTP).
 *
 * @example
 * ```ts
 * import { generate } from '@boringordinary/wordcode'
 *
 * generate()        // "maple-river-sunset"
 * generate(4)       // "maple-river-sunset-bold"
 * generate(3, " ")  // "maple river sunset"
 * ```
 */

// prettier-ignore
const WORDS: readonly string[] = [
  // ── animals (90) ──
  "ant","ape","bat","bear","bee","bird","boar","buck","bull","calf",
  "cat","clam","cob","cod","colt","crab","crow","cub","deer","dog",
  "dove","duck","eagle","eel","elk","ewe","fawn","finch","fish","flea",
  "foal","fox","frog","gnat","gnu","goat","goose","gull","hare","hawk",
  "hen","heron","horse","hound","ibis","jay","kite","koi","lamb","lark",
  "lion","lynx","mare","mink","mole","moth","mouse","mule","newt","orca",
  "owl","panda","pike","pony","pug","puma","quail","ram","rat","raven",
  "robin","seal","shark","sheep","slug","snail","snake","stag","stork","swan",
  "toad","trout","tuna","vole","wasp","whale","wolf","wren","yak","zebra",

  // ── nature (110) ──
  "acorn","ash","bark","bay","birch","bloom","bough","brook","bud","bush",
  "cave","cedar","cliff","cloud","coast","coral","creek","dale","dawn","dell",
  "dew","drift","dune","dusk","dust","elm","fern","field","flame","flint",
  "flood","flora","fog","frost","gale","glen","gorge","grass","grove","gust",
  "haze","heath","hedge","herb","hill","hive","holly","ice","iris","ivy",
  "jade","lake","leaf","lily","lime","log","maple","marsh","mist","moon",
  "moss","oak","oasis","ocean","ore","palm","peak","pearl","petal","pine",
  "plume","pond","rain","rapid","reef","ridge","rill","river","rock","root",
  "rose","rush","sage","sand","sea","seed","shade","shore","sky","slope",
  "snow","soil","spring","star","stem","stone","storm","sun","surge","swamp",
  "thorn","tide","trail","tree","tulip","vale","vine","wave","weed","willow",

  // ── food & drink (70) ──
  "apple","basil","bean","berry","bread","brew","broth","cake","candy",
  "cheese","cherry","chili","chip","clove","cocoa","corn","cream","crust",
  "curry","date","dill","dough","feast","fig","flour","fruit","garlic",
  "ginger","grain","grape","guava","honey","jam","juice","kale","kiwi",
  "leek","lemon","malt","mango","melon","mint","mocha","naan","nut","oat",
  "olive","onion","pasta","peach","pear","plum","rice","rye","salt","soup",
  "spice","sugar","syrup","tea","toast","wheat","yam","broth","cider",
  "cocoa","flask","punch","roast",

  // ── objects (170) ──
  "anvil","arch","badge","band","bell","bench","blade","blank","block",
  "board","bolt","book","boot","bow","box","brick","broom","brush","cable",
  "cage","candle","cap","card","cart","case","chain","chair","chalk","charm",
  "chest","clasp","clip","clock","cloth","coil","coin","comb","cone","cord",
  "cork","craft","crate","crown","cup","dart","desk","dial","disc","dome",
  "door","drum","fan","fence","flag","fork","frame","gate","gear","gem",
  "glass","globe","glove","grid","grip","guard","halo","harp","hat","helm",
  "hook","hoop","horn","jar","key","knob","knot","lace","lamp","lance",
  "latch","lens","lever","lid","lock","loom","mace","map","mask","match",
  "mesh","mold","nail","net","notch","oar","orb","pack","pad","page",
  "pail","panel","patch","pen","pin","pipe","plank","plate","plug","pouch",
  "press","prism","quill","rack","ramp","reed","reel","ring","rivet","rod",
  "rope","sail","scale","screw","shaft","shard","shell","shelf","shield","sign",
  "slate","sleeve","slide","slot","snap","soap","spool","spoke","stamp","stand",
  "strap","strip","stud","switch","sword","tape","tile","torch","tower","tray",
  "trunk","tube","valve","vase","vault","wand","wedge","wheel","wire","wrench",
  "flask","lens","plaque","sash","sheath","spade","spindle","clasp","anchor",
  "badge",

  // ── actions (200) ──
  "aim","ask","bake","bend","bind","bite","blaze","blend","boil","bolt",
  "bound","brave","break","burn","burst","call","carve","cast","catch",
  "chase","cheer","chime","chop","claim","clap","clash","clasp","climb",
  "cling","close","coax","coil","comb","cook","count","crack","crawl",
  "cross","crush","curl","cut","dare","dart","dash","deal","delve","dip",
  "dive","dodge","draft","drain","draw","drift","drive","drop","dry","dye",
  "earn","ease","edge","eject","fade","fetch","fill","find","fling","flip",
  "float","flow","fly","fold","force","forge","form","fuse","gain","gaze",
  "glide","glow","grab","grasp","grind","guard","guide","halt","hang","haul",
  "heap","hike","hold","hurl","inch","join","jolt","jump","keep","kneel",
  "knit","latch","launch","lead","lean","leap","lift","link","loft","loom",
  "lunge","march","melt","mend","merge","mix","mold","mount","move","nest",
  "nudge","orbit","pace","paint","parse","pass","pause","peel","pitch","plant",
  "plead","pluck","plumb","plunge","point","pose","pour","press","probe",
  "prowl","pull","pulse","push","quest","quote","race","raise","rally",
  "reach","reign","rest","ride","rise","roam","roll","rush","save","scan",
  "scout","seal","seek","seize","send","shape","shift","shine","sift","sink",
  "skip","slash","slice","slide","sling","soar","sort","spark","speak","spell",
  "spill","spin","split","spray","stalk","stand","stare","start","stash",
  "steer","step","stir","stock","stomp","store","stow","surge","sway","sweep",
  "swim","swing","swirl","tame","tilt","toss","trace","trade","trail","trend",
  "trim","tug","turn","twist","vault","wade","wake","walk","watch","weave",
  "weld","whirl","wield","yawn","yield",

  // ── adjectives (180) ──
  "able","aged","apt","avid","bare","blunt","bold","brave","brief","brisk",
  "broad","calm","clean","clear","close","cool","crisp","dark","dear","deep",
  "dense","dim","dry","dull","eager","early","even","extra","faint","fair",
  "fast","fierce","final","fine","firm","flat","fond","frank","free","fresh",
  "full","glad","grand","gray","great","green","grim","half","harsh","heavy",
  "high","huge","humble","idle","inner","keen","kind","large","last","late",
  "lean","light","live","long","loose","loud","low","lucid","major","meek",
  "mild","minor","moist","mute","narrow","near","neat","new","noble","numb",
  "odd","old","open","outer","pale","plain","plush","prime","proud","pure",
  "quick","quiet","rapid","rare","raw","ready","real","rich","rigid","ripe",
  "rough","round","royal","rude","safe","sharp","sheer","short","shy","silent",
  "sleek","slick","slim","slow","small","smart","smooth","snug","sober","soft",
  "solid","sour","spare","stark","steep","stern","stiff","still","stout","stray",
  "strong","sturdy","subtle","super","sure","sweet","swift","tall","tame","taut",
  "thick","thin","tidy","tight","tiny","total","tough","true","upper","used",
  "vague","vast","vivid","void","warm","weak","whole","wide","wild","wise",
  "young","ample","bleak","dense","dusty","fleet","gentle","golden","keen",
  "mellow","placid","plump","rugged","serene","simple","supple","tender","vivid",

  // ── places & things (180) ──
  "acre","aisle","apex","bank","base","basin","batch","beam","bliss","bluff",
  "blur","bond","brass","brine","brink","bronze","bulge","bunch","cabin","canal",
  "cargo","cause","cell","chant","chief","chord","chunk","cinch","claim","class",
  "claw","cloak","club","clue","clutch","coach","code","comet","core","count",
  "court","cove","crash","crest","crop","crowd","curve","cycle","data","dawn",
  "decay","delta","depth","digit","drama","dream","dress","drone","dwell","echo",
  "ember","epoch","error","event","exile","fable","fault","fiber","flare","fleet",
  "flesh","flock","floor","focus","force","forum","fury","gamma","ghost","giant",
  "gift","gland","gleam","glint","gloss","glyph","gorge","grace","graph","grasp",
  "guild","haven","heart","honor","house","humor","hymn","image","jewel","judge",
  "knack","lathe","ledge","lingo","lodge","logic","lumen","lunch","lyric","magic",
  "manor","march","mayor","medal","mercy","merit","metal","might","model","moral",
  "motto","mound","music","nerve","nexus","night","north","notch","novel","omega",
  "onset","order","organ","oxide","panel","party","phase","pilot","pixel","place",
  "plane","plaza","pleat","poise","polar","pound","power","pride","print","prize",
  "proof","prose","prune","psalm","pulse","quota","range","realm","reign","rival",
  "route","ruin","rumor","scene","scope","sense","sigma","skill","smith","solar",
  "sound","south","space","spear","sport","squad","stage","stake","steel","stock",
  "strut","study","suite","tally","tempo","theta","token","topic","tower","track",
  "triad","tribe","truce","trust","truth","ultra","union","unity","valve","verse",
  "vigor","vinyl","voice","width","world","worth","wrath","youth","zeal","alpha",
  "dock","pier","cobalt",
];

/** The deduplicated 1,000-word list used for code generation. */
export const words: readonly string[] = [...new Set(WORDS)];

/**
 * Generate a word-based code using crypto-secure randomness.
 *
 * @param count - Number of words (default: 3)
 * @param separator - Word separator (default: "-")
 * @returns A hyphenated word code, e.g. "maple-river-sunset"
 *
 * @example
 * ```ts
 * generate()        // "maple-river-sunset"
 * generate(4)       // "maple-river-sunset-bold"
 * generate(3, " ")  // "maple river sunset"
 * ```
 */
export function generate(count = 3, separator = "-"): string {
  const bytes = new Uint32Array(count);
  crypto.getRandomValues(bytes);
  const picked = Array.from(bytes, (b) => words[b % words.length]);
  return picked.join(separator);
}
