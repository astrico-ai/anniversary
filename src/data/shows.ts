import type { Episode, MediaSource, Row, Show } from "@/lib/types";
import { assetsInFolder } from "./cloudinary-assets";

function cldRef(publicId: string): MediaSource {
  return { kind: "cloudinary", publicId };
}

function pickCover(folder: string): {
  poster: MediaSource;
  backdrop: MediaSource;
  trailer?: MediaSource;
} {
  const assets = assetsInFolder(folder);
  const firstImage = assets.find((a) => a.type === "image");
  const firstVideo = assets.find((a) => a.type === "video");
  const cover = firstImage ?? firstVideo;
  if (!cover) {
    return {
      poster: { kind: "url", url: `https://placehold.co/600x900/1a1a1a/ffffff?text=${encodeURIComponent(folder)}&font=oswald` },
      backdrop: { kind: "url", url: `https://placehold.co/1920x1080/0d0d0d/ffffff?text=${encodeURIComponent(folder)}&font=oswald` },
    };
  }
  return {
    poster: cldRef(cover.publicId),
    backdrop: cldRef(cover.publicId),
    trailer: firstVideo ? cldRef(firstVideo.publicId) : undefined,
  };
}

const unfilteredSequence: { publicId: string; type: "image" | "video" }[] = [
  { publicId: "2f851225-210d-4512-ad14-dd59ebebea1f_rhua5t", type: "image" },
  { publicId: "22c1c739-8d5b-460f-8dce-b5a222a6ccc2_ukhdxn", type: "image" },
  { publicId: "adb67dd4-77a3-4bf3-9a19-e2646d154f16_tssegv", type: "image" },
  { publicId: "e150e941-a2e1-4c8e-9362-369155fd791c_gbc2ul", type: "image" },
  { publicId: "f3f5e3f3-7d6c-4320-a36e-9de2f2fb6a7c_y1ovzp", type: "image" },
  { publicId: "f812fc3a-ed9c-4b12-beec-1e103e8f5ab8_t5ownc", type: "image" },
  { publicId: "IMG_2267_d5e31d",                             type: "image" },
  { publicId: "IMG_2857_qlrqwe",                             type: "image" },
  { publicId: "IMG_2882_ncnguk",                             type: "image" },
  { publicId: "dcc4eab7-e7fc-4fea-82cf-203779695b48_d70xzc", type: "image" },
];

const unfilteredCover = pickCover("Generic");

const travelDiariesSequence: { publicId: string; type: "image" | "video" }[] = [
  { publicId: "IMG_4964_hdjrbr", type: "image" }, // 1
  { publicId: "IMG_4924_rnvkyc", type: "image" }, // 2
  { publicId: "IMG_6416_zojomo", type: "image" }, // 3
  { publicId: "IMG_4910_y0epvh", type: "image" }, // 4
  { publicId: "IMG_6347_gdmwhi", type: "image" }, // 5
  { publicId: "IMG_6803_kypztp", type: "image" }, // 6
  { publicId: "IMG_9354_qf8cye", type: "image" }, // 7
  { publicId: "IMG_9352_jnbe1g", type: "image" }, // 8
  { publicId: "IMG_4841_ngrwt9", type: "image" }, // 9
  { publicId: "IMG_6360_itfapk", type: "image" }, // 10
  { publicId: "IMG_6767_zjr5gb", type: "image" }, // 11
  { publicId: "IMG_6479_cmdflh", type: "image" }, // 12
  { publicId: "IMG_7145_tsbjrf", type: "image" }, // 13
  { publicId: "IMG_9346_vpjrkp", type: "image" }, // 14
  { publicId: "IMG_4916_x4nwap", type: "image" }, // 15
  { publicId: "IMG_7101_tt7eot", type: "image" }, // 16
  { publicId: "IMG_9382_v6jjfq", type: "image" }, // 17
  { publicId: "IMG_6943_gnemfv", type: "image" }, // 18
  { publicId: "IMG_6594_nehnni", type: "image" }, // 19
  { publicId: "IMG_6585_cz57hh", type: "image" }, // 20
  { publicId: "IMG_4839_jrao72", type: "image" }, // 21
  { publicId: "IMG_6349_umlt22", type: "image" }, // 22
  { publicId: "IMG_9373_dl2dyz", type: "image" }, // 23
  { publicId: "IMG_6488_dpjogf", type: "image" }, // 25
  { publicId: "IMG_9349_hjcvoh", type: "image" }, // 26
  { publicId: "IMG_6830_lfzzy8", type: "image" }, // 27
  { publicId: "IMG_7103_sx6q7e", type: "image" }, // 28
  { publicId: "IMG_6945_l3b7ga", type: "image" }, // 29
  { publicId: "IMG_6360_bpsh1l", type: "image" }, // 30
  { publicId: "IMG_6339_tn4m30", type: "image" }, // 32
  { publicId: "IMG_6346_sqlrx3", type: "image" }, // 33
  { publicId: "IMG_4959_pvjur9", type: "image" }, // 34
  { publicId: "IMG_6763_wvw3kv", type: "image" }, // 35
  { publicId: "IMG_6350_hzvbng", type: "image" }, // 36
  { publicId: "IMG_4961_izg2ij", type: "image" }, // 37
];

const travelDiariesCover = pickCover("Trips");

const whereItAllBeganSequence: { publicId: string; type: "image" | "video" }[] = [
  { publicId: "ca418172-a635-4b48-9e5b-b18e6b32e809_ruwmeq", type: "image" },
  { publicId: "IMG_6026_famoxy",                              type: "image" },
  { publicId: "66b1a769-d856-4654-ba7c-3c53a5b4ec15_lsxmsk", type: "image" },
  { publicId: "9da79b54-46d5-4436-8660-30cbb1a0d45b_lfafy5",  type: "image" },
  { publicId: "50bdb122-582e-483f-b848-78498dbd2446_thx0rw",  type: "image" },
  { publicId: "828c5f7a-c395-403e-b18c-b55ae9338221_owsn9z",  type: "image" },
  { publicId: "9900d49f-5c43-4fdc-b53f-6379bcd52572_uwe9hu",  type: "image" },
  { publicId: "494399be-9da5-4aad-9d47-81d822bf1b64_jd9mxr",  type: "image" },
  { publicId: "b467dfbf-b2be-4605-8541-7fe7a18609e6_nig4su",  type: "image" },
  { publicId: "ca418172-a635-4b48-9e5b-b18e6b32e809_w1zcjw",  type: "image" },
  { publicId: "IMG_0061_uhqsxx",                              type: "image" },
  { publicId: "IMG_0088_tvagj3",                              type: "image" },
  { publicId: "IMG_0062_f25tad",                              type: "image" },
  { publicId: "IMG_0177_bquwrg",                              type: "image" },
  { publicId: "IMG_8422_yytiqf",                              type: "image" },
];

const whereItAllBeganCover = pickCover("Where it All Began");

// 27 assets (22 photos + 5 videos) — videos at positions 5,14,18,22,27
// video 2 (BBC668C2) moved to pos 14 with 8 images of breathing room after video 1
const inHerElementSequence: { publicId: string; type: "image" | "video" }[] = [
  { publicId: "IMG_4845_eyircm",                                      type: "image" }, // 1
  { publicId: "IMG_6352_xodozr",                                      type: "image" }, // 2
  { publicId: "IMG_6353_v9a40f",                                      type: "image" }, // 3
  { publicId: "4a9c3218-d2bf-4b2e-8920-f1a58603146e_v6lgb9",          type: "image" }, // 4
  { publicId: "d63dbea5-919a-45c2-9c30-babd21744a54_jj3dpp",          type: "video" }, // 5 ← video 1
  { publicId: "9a9819b7-f488-42a1-b8d6-87c4d1e89f73_nd01ez",          type: "image" }, // 6
  { publicId: "6ef27684-8ae0-4b47-a956-92fbd68c781f_vmfrqf",          type: "image" }, // 7
  { publicId: "115c4594-d073-4672-9d51-624791a6795d_gxdpg6",          type: "image" }, // 8
  { publicId: "a0838c88-9ef6-4c2b-ab44-26816f43dc1e_zulkve",          type: "image" }, // 9
  { publicId: "a8a7f213-3c96-42d1-9b3e-ae2934a6eac9_kvkyiy",          type: "image" }, // 10
  { publicId: "b5146d1a-674d-4656-a6c6-1f93294a598b_jshefe",          type: "image" }, // 11
  { publicId: "B4A13E31-55CA-415D-B0C8-2CFC0025CC67_gwendu",          type: "image" }, // 12
  { publicId: "db48ef7d-694c-4762-ae13-082a06e265e0_dol3fl",          type: "image" }, // 13
  { publicId: "BBC668C2-6527-43B0-9DF3-8B2E9275EF6C_vyvzre",          type: "video" }, // 14 ← video 2
  { publicId: "f6a790aa-f1f8-4461-a036-963dcb187446_nhfxzo",          type: "image" }, // 15
  { publicId: "IMG_0181_bbskrl",                                      type: "image" }, // 16
  { publicId: "IMG_6193_nkllnx",                                      type: "image" }, // 17
  { publicId: "IMG_6377_z4j207",                                      type: "video" }, // 18 ← video 3
  { publicId: "IMG_6192_ibsnjj",                                      type: "image" }, // 19
  { publicId: "IMG_6439_noxesm",                                      type: "image" }, // 20
  { publicId: "IMG_6589_smusg4",                                      type: "image" }, // 21
  { publicId: "IMG_0052_ygwpeo",                                      type: "video" }, // 22 ← video 4
  { publicId: "IMG_6870_vvveql",                                      type: "image" }, // 23
  { publicId: "IMG_6896_qld3il",                                      type: "image" }, // 24
  { publicId: "IMG_6899_jerftg",                                      type: "image" }, // 25
  { publicId: "IMG_8244_fntm7w",                                      type: "image" }, // 26
  { publicId: "filtered-8551B2F1-CB64-4CDF-91EF-5443617B5178_xa5gjb", type: "video" }, // 27 ← video 5 (finish)
];

const inHerElementCover = {
  poster: cldRef("IMG_4845_eyircm"),
  backdrop: cldRef("IMG_4845_eyircm"),
  trailer: cldRef("d63dbea5-919a-45c2-9c30-babd21744a54_jj3dpp"),
};

const coldplayCoverVideoId = "58f5e5fc-1f77-4be1-9923-8f45a1db94e7_hbsbuj";
const coldplayAssets = assetsInFolder("Coldplay");
const coldplayCover = {
  poster: cldRef("70c57e70-855e-447c-9c2b-bc2d0aba082d_hbvddm"),
  backdrop: cldRef("70c57e70-855e-447c-9c2b-bc2d0aba082d_hbvddm"),
  trailer: cldRef(coldplayCoverVideoId),
};

const coldplaySequence: { publicId: string; type: "image" | "video" }[] = [
  { publicId: "70c57e70-855e-447c-9c2b-bc2d0aba082d_hbvddm", type: "image" },
  { publicId: "3eb1e8d4-1e7c-4b11-a39b-c92d4a272775_bgknp2", type: "image" },
  { publicId: "53e91b5d-726c-4ae9-bb43-0fd050d0bb5a_vawji7", type: "image" },
  { publicId: "258a90b9-2e8e-45d9-8efb-3e5eea930cbe_evr3nl", type: "image" },
  { publicId: "129f7d0d-5ebd-4d38-86d2-1eb0696e72bc_poxjgc", type: "image" },
  { publicId: "43bdf709-5b10-479c-a631-e9960c06af7e_pvtc1t", type: "video" },
  { publicId: "719ba0d7-2ea2-4862-bf45-4c3ef4fa07fd_ezrawv", type: "image" },
  { publicId: "58f5e5fc-1f77-4be1-9923-8f45a1db94e7_hbsbuj", type: "video" },
  { publicId: "38a423d9-d3f4-47e3-a1dc-1517c4688e83_ivobna", type: "image" },
  { publicId: "21a5fd09-1487-43ec-9b26-454f0ac292ae_bt4xi1", type: "image" },
  { publicId: "8612be79-646a-4126-9fda-e86aa0f39c8a_x83ooi", type: "image" },
  { publicId: "c47efeba-b0ac-48b6-b7a1-18034e9f72ab_gndoc1", type: "video" },
  { publicId: "ff2d39da-63da-46b9-9e63-d39a52863f3a_syr6d2", type: "image" },
  { publicId: "db2813c9-11be-4ca9-92ef-c082b288f645_nutqjx", type: "video" },
  { publicId: "175272e7-77af-4e84-82ad-7c72d0798621_iqq08e", type: "image" },
  { publicId: "47088be6-a5f0-4646-92a6-584f6e5ad667_lxcavu", type: "video" },
  { publicId: "891e606b-8cf4-4704-833b-6ad333807566_raoavh", type: "video" },
];

export const shows: Show[] = [
  {
    id: "coldplay",
    title: "The Concert",
    tagline: "A live show, in frames",
    synopsis:
      "A night out, the lights, the crowd, the two of us in the middle of it.",
    year: "2025",
    badge: "LIVE",
    matchPercent: 99,
    rating: "U",
    durationLabel: (() => {
      const v = coldplaySequence.filter((a) => a.type === "video").length;
      const p = coldplaySequence.length - v;
      const parts: string[] = [];
      if (p) parts.push(`${p} Photos`);
      if (v) parts.push(`${v} Videos`);
      return parts.join(" · ");
    })(),
    cast: ["Sanuj", "Sanskriti"],
    genres: ["Music", "Live", "Memory"],
    poster: coldplayCover.poster,
    backdrop: coldplayCover.backdrop,
    trailer: coldplayCover.trailer,
    episodes: coldplaySequence.map((item, i) => ({
      id: `coldplay-${i + 1}`,
      title: `The Concert · ${i + 1}`,
      description: "",
      durationLabel: item.type === "video" ? "Video" : "Photo",
      thumbnail: cldRef(item.publicId),
      media: cldRef(item.publicId),
      mediaType: item.type,
    })),
    slideshow: {
      musicSrc: "/music/viva-la-vida.mp3",
      photoDuration: 3000,
      musicStartTime: 37,
    },
  },
  {
    id: "unfiltered",
    title: "Unfiltered",
    tagline: "No occasion. No filter. Just us.",
    synopsis: "The moments that didn't need a reason — they just happened, and somehow those are the ones worth keeping.",
    year: "2024–2026",
    matchPercent: 98,
    rating: "U",
    durationLabel: `${unfilteredSequence.length} Photos`,
    cast: ["Sanuj", "Sanskriti"],
    genres: ["Slice of Life"],
    poster: unfilteredCover.poster,
    backdrop: unfilteredCover.backdrop,
    episodes: unfilteredSequence.map((item, i) => ({
      id: `uf-${i + 1}`,
      title: `Unfiltered · ${i + 1}`,
      description: "",
      durationLabel: "Photo",
      thumbnail: cldRef(item.publicId),
      media: cldRef(item.publicId),
      mediaType: item.type,
    })),
    slideshow: {
      musicSrc: "/music/kesariya.mp3",
      photoDuration: 3500,
      musicStartTime: 29,
    },
  },
  {
    id: "travel-diaries",
    title: "Travel Diaries",
    tagline: "Every trip, every frame",
    synopsis: "New places, same two people. A postcard from everywhere we've been together.",
    year: "2024–2026",
    matchPercent: 97,
    rating: "U",
    durationLabel: `${travelDiariesSequence.length} Photos`,
    cast: ["Sanuj", "Sanskriti"],
    genres: ["Travel", "Documentary"],
    poster: travelDiariesCover.poster,
    backdrop: travelDiariesCover.backdrop,
    episodes: travelDiariesSequence.map((item, i) => ({
      id: `td-${i + 1}`,
      title: `Travel Diaries · ${i + 1}`,
      description: "",
      durationLabel: "Photo",
      thumbnail: cldRef(item.publicId),
      media: cldRef(item.publicId),
      mediaType: item.type,
    })),
    slideshow: {
      musicSrc: "/music/ilahi.mp3",
      photoDuration: 3000,
      musicStartTime: 25,
    },
  },
  {
    id: "where-it-all-began",
    title: "Where It All Began",
    tagline: "The origin story",
    synopsis: "Before the anniversaries, before the inside jokes — this is where it started.",
    year: "2024",
    badge: "S&S ORIGINAL",
    matchPercent: 100,
    rating: "U",
    durationLabel: `${whereItAllBeganSequence.length} Photos`,
    cast: ["Sanuj", "Sanskriti"],
    genres: ["Romance", "Origin Story", "Documentary"],
    poster: whereItAllBeganCover.poster,
    backdrop: whereItAllBeganCover.backdrop,
    episodes: whereItAllBeganSequence.map((item, i) => ({
      id: `wiab-${i + 1}`,
      title: `Where It All Began · ${i + 1}`,
      description: "",
      durationLabel: "Photo",
      thumbnail: cldRef(item.publicId),
      media: cldRef(item.publicId),
      mediaType: item.type,
    })),
    slideshow: {
      musicSrc: "/music/perfect.mp3",
      photoDuration: 3500,
      musicStartTime: 3,
    },
  },
  {
    id: "in-her-element",
    title: "In Her Element",
    tagline: "Unscripted, unfiltered, entirely her",
    synopsis:
      "The real her — the laughing, tripping, glowing, completely-herself version. No filter needed.",
    year: "2024–2026",
    badge: "S&S ORIGINAL",
    matchPercent: 100,
    rating: "U",
    durationLabel: (() => {
      const v = inHerElementSequence.filter((a) => a.type === "video").length;
      const p = inHerElementSequence.length - v;
      const parts: string[] = [];
      if (p) parts.push(`${p} Photos`);
      if (v) parts.push(`${v} Videos`);
      return parts.join(" · ");
    })(),
    cast: ["Sanskriti"],
    genres: ["Slice of Life", "Documentary", "Romance"],
    poster: inHerElementCover.poster,
    backdrop: inHerElementCover.backdrop,
    trailer: inHerElementCover.trailer,
    episodes: inHerElementSequence.map((item, i) => ({
      id: `ihe-${i + 1}`,
      title: `In Her Element · ${i + 1}`,
      description: "",
      durationLabel: item.type === "video" ? "Video" : "Photo",
      thumbnail: cldRef(item.publicId),
      media: cldRef(item.publicId),
      mediaType: item.type,
    })),
    slideshow: {
      musicSrc: "/music/tum-mile.mp3",
      photoDuration: 3000,
      musicStartTime: 35,
      videoDuration: 6,
    },
  },
];

const showOrder = [
  "where-it-all-began",
  "in-her-element",
  "coldplay",
  "travel-diaries",
  "unfiltered",
];

export const rows: Row[] = [
  {
    id: "trending",
    title: "Trending in Our House",
    showIds: showOrder,
  },
];

export const featuredShowId = "where-it-all-began";

export function getShow(id: string): Show | undefined {
  return shows.find((s) => s.id === id);
}
