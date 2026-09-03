document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page || "home";
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-list a");
  const exploreButton = document.querySelector(".hero-actions .btn-primary");
  const sections = document.querySelectorAll("main section[id]");
  const topicButtons = document.querySelectorAll(".explore-btn");
  const detailPanel = document.getElementById("topic-detail");
  const detailTitle = document.getElementById("topic-detail-title");
  const detailText = document.getElementById("topic-detail-text");
  const topicSearchForm = document.getElementById("topic-search-form");
  const topicSearchInput = document.getElementById("topic-search-input");
  const topicSearchButton = document.getElementById("topic-search-button");
  const discoverTopicButton = document.getElementById("discover-topic-button");
  const selectedTopicLabel = document.getElementById("selected-topic-label");
  const topicSearchStatus = document.getElementById("topic-search-status");
  const recentSearchesEl = document.getElementById("recent-searches");
  const recentSearchListEl = document.getElementById("recent-search-list");
  const topicResult = document.getElementById("topic-result");
  const topicResultMeta = document.getElementById("topic-result-meta");
  const topicResultTitle = document.getElementById("topic-result-title");
  const topicResultExplanation = document.getElementById("topic-result-explanation");
  const topicResultThumbnail = document.getElementById("topic-result-thumbnail");
  const relatedTopicsEl = document.getElementById("related-topics");
  const relatedTopicListEl = document.getElementById("related-topic-list");
  const topicResultLink = document.getElementById("topic-result-link");
  const creativeButtons = document.querySelectorAll(".creative-btn");
  const creativeDetailPanel = document.getElementById("creative-detail");
  const creativeDetailTitle = document.getElementById("creative-detail-title");
  const creativeDetailText = document.getElementById("creative-detail-text");
  const badgeListEl = document.getElementById("badge-list");
  const badgeCountValueEl = document.getElementById("badge-count-value");
  const quizzesCompletedEl = document.getElementById("quizzes-completed");
  const challengesCompletedEl = document.getElementById("challenges-completed");
  const activitiesCompletedEl = document.getElementById("activities-completed");
  const topicsExploredValueEl = document.getElementById("topics-explored-value");
  const nextAchievementNameEl = document.getElementById("next-achievement-name");
  const nextAchievementProgressTextEl = document.getElementById("next-achievement-progress-text");
  const nextAchievementProgressFillEl = document.getElementById("next-achievement-progress-fill");
  const nextAchievementDetailEl = document.getElementById("next-achievement-detail");
  const unlockedBadgeListEl = document.getElementById("unlocked-badge-list");
  const lockedBadgeListEl = document.getElementById("locked-badge-list");
  const explorerJourneyEl = document.getElementById("explorer-journey");
  const learningStreakValueEl = document.getElementById("learning-streak-value");
  const streakNoteEl = document.getElementById("streak-note");
  const achievementCelebrationEl = document.getElementById("achievement-celebration");
  const statQuizzesCompletedEl = document.getElementById("stat-quizzes-completed");
  const statChallengesCompletedEl = document.getElementById("stat-challenges-completed");
  const statTopicsExploredEl = document.getElementById("stat-topics-explored");
  const statActivitiesCompletedEl = document.getElementById("stat-activities-completed");
  const statTotalPointsEl = document.getElementById("stat-total-points");
  const factIconEl = document.getElementById("fact-icon");
  const factCategoryEl = document.getElementById("fact-category");
  const factTextEl = document.getElementById("fact-text");
  const anotherFactButton = document.getElementById("another-fact-btn");
  const factCardEl = document.querySelector(".fact-card");
  const siteSearchInput = document.getElementById("site-search");
  const searchResultsEl = document.getElementById("search-results");
  const explorerLearningMapEl = document.getElementById("explorer-learning-map");
  const profileModal = document.getElementById("profile-modal-backdrop");
  const learnerProfileForm = document.getElementById("learner-profile-form");
  const profileNameInput = document.getElementById("profile-name");
  const profileAgeInput = document.getElementById("profile-age");
  const profileGradeSelect = document.getElementById("profile-grade");
  const profileWelcomeEl = document.getElementById("profile-welcome");
  const editProfileButton = document.getElementById("edit-profile-btn");

  const sharedSiteData = window.youngExplorerData || {};
  const PROFILE_STORAGE_KEY = "youngExplorerProfile";
  const expandedExploreLibrary = Array.isArray(sharedSiteData.expandedExploreLibrary) && sharedSiteData.expandedExploreLibrary.length > 0
    ? sharedSiteData.expandedExploreLibrary
    : [];

  const topicDetails = {
    science: {
      title: "Science",
      text: "Science helps us explore the world by asking questions, testing ideas, and discovering how things work. From tiny cells to big planets, every experiment can lead to a new wonder."
    },
    animals: {
      title: "Animals",
      text: "Animals live in habitats all around the world. Some swim, fly, climb, or hunt, and each animal has amazing adaptations that help it survive and thrive."
    },
    space: {
      title: "Space",
      text: "Space is full of planets, stars, moons, and galaxies. Learning about space helps us imagine new worlds, discover mysteries, and understand our place in the universe."
    },
    nature: {
      title: "Nature",
      text: "Nature includes forests, rivers, oceans, weather, and the living things around us. Caring for nature helps protect animals, plants, and the planet we all share."
    },
    history: {
      title: "History",
      text: "History tells stories about people, inventions, and important events from the past. Learning about history helps us understand how the world has changed over time."
    },
    geography: {
      title: "Geography",
      text: "Geography is the study of places, lands, maps, and the people who live there. It helps us learn about countries, climates, cultures, and amazing landmarks."
    }
  };

  const topicSearchConfig = sharedSiteData.exploreTopics || {
    science: { icon: "🔬", label: "Science", placeholder: "Try photosynthesis, gravity, atoms...", discoverQuery: "science", signals: ["science", "physics", "chemistry", "biology", "genetics", "gravity", "electricity", "atom", "molecule", "experiment", "scientist"] },
    animals: { icon: "🐾", label: "Animals", placeholder: "Try dolphins, penguins, insects...", discoverQuery: "animals", signals: ["animal", "mammal", "bird", "fish", "reptile", "amphibian", "insect", "species", "genus", "fauna", "wildlife", "zoology"] },
    space: { icon: "🚀", label: "Space", placeholder: "Try Mars, black holes, astronauts...", discoverQuery: "space", signals: ["space", "planet", "star", "moon", "astronomy", "astronaut", "spaceflight", "spacecraft", "nasa", "galaxy", "universe", "orbit"] },
    nature: { icon: "🌿", label: "Nature", placeholder: "Try rainforests, oceans, weather...", discoverQuery: "nature", signals: ["nature", "plant", "forest", "rainforest", "ocean", "ecosystem", "ecology", "environment", "weather", "climate", "tree", "flower"] },
    history: { icon: "🏺", label: "History", placeholder: "Try Ancient Egypt, Mansa Musa, Renaissance...", discoverQuery: "history", signals: ["history", "historical", "ancient", "empire", "war", "civilization", "dynasty", "kingdom", "archaeology", "ruler", "century"] },
    geography: { icon: "🌍", label: "Geography", placeholder: "Try Nigeria, rivers, continents...", discoverQuery: "geography", signals: ["geography", "country", "countries", "continent", "river", "mountain", "city", "capital", "location", "place", "region", "map", "nigeria"] }
  };

  const TOPIC_API_URL = "https://simple.wikipedia.org/w/api.php";
  let selectedTopic = null;
  let topicRequestId = 0;
  const RECENT_SEARCHES_KEY = "youngExplorerRecentTopicSearches";
  const LAST_DISCOVERIES_KEY = "youngExplorerLastDiscoveries";

  const getLastDiscovery = (topic) => {
    try {
      const discoveries = JSON.parse(localStorage.getItem(LAST_DISCOVERIES_KEY) || "{}");
      return discoveries[topic] || "";
    } catch (error) {
      return "";
    }
  };

  const saveLastDiscovery = (topic, title) => {
    let discoveries = {};

    try {
      discoveries = JSON.parse(localStorage.getItem(LAST_DISCOVERIES_KEY) || "{}");
    } catch (error) {
      discoveries = {};
    }

    discoveries[topic] = title;
    localStorage.setItem(LAST_DISCOVERIES_KEY, JSON.stringify(discoveries));
  };

  const getRecentSearches = (topic) => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "{}");
      return Array.isArray(savedSearches[topic]) ? savedSearches[topic] : [];
    } catch (error) {
      return [];
    }
  };

  const saveRecentSearch = (topic, query) => {
    const trimmedQuery = String(query || "").trim();
    if (!topic || !trimmedQuery) return;

    const searches = getRecentSearches(topic).filter((item) => item && item.toLowerCase() !== trimmedQuery.toLowerCase());
    searches.unshift(trimmedQuery);
    const savedSearches = {};

    try {
      Object.assign(savedSearches, JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "{}"));
    } catch (error) {
      // Use an empty recent-search record when storage contains invalid data.
    }

    savedSearches[topic] = searches.slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(savedSearches));
  };

  const renderRecentSearches = (topic) => {
    const searches = getRecentSearches(topic);

    if (!recentSearchesEl || !recentSearchListEl) return;

    recentSearchListEl.innerHTML = "";
    recentSearchesEl.hidden = searches.length === 0;

    searches.forEach((query) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "recent-search-button";
      button.textContent = query;
      button.addEventListener("click", () => {
        topicSearchInput.value = query;
        handleTopicSearch(query);
      });
      recentSearchListEl.appendChild(button);
    });
  };

  const decodeTopicValue = (value) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = value || "";
    return textArea.value;
  };

  const categorySignalMap = {
    science: ["science", "scientific", "scientist", "physics", "chemistry", "biology", "astronomy", "geology", "earth science", "experiment", "research", "discovery", "planet", "volcano", "earthquake", "climate", "ocean", "gravity", "energy", "matter", "ecosystem", "species"],
    animals: ["animal", "animals", "mammal", "bird", "fish", "reptile", "amphibian", "insect", "species", "wildlife", "zoology", "habitat", "predator", "vertebrate", "ecosystem"],
    space: ["space", "astronomy", "planet", "star", "moon", "solar", "galaxy", "orbit", "astronaut", "spacecraft", "cosmos", "universe", "nebula", "comet", "asteroid", "exploration"],
    nature: ["nature", "natural", "environment", "ecology", "ecosystem", "forest", "rainforest", "ocean", "river", "mountain", "weather", "climate", "volcano", "earthquake", "geology", "landform", "wildlife", "habitat", "plant", "animal", "earth", "desert"],
    history: ["history", "historical", "ancient", "empire", "civilization", "dynasty", "kingdom", "ruler", "medieval", "century", "archaeology", "war", "pharaoh", "monument", "society", "nation"],
    geography: ["geography", "geographic", "geological", "geology", "country", "continent", "region", "city", "capital", "river", "mountain", "ocean", "desert", "climate", "landform", "earthquake", "volcano", "plate", "tectonics", "location", "map", "terrain", "island", "coast", "fault", "earth"]
  };

  const topicMatchesCategory = (page, topic) => {
    const config = topicSearchConfig[topic];
    if (!config) return false;

    const categoryMetadata = (page.categories || [])
      .map((category) => category.title || "")
      .join(" ")
      .toLowerCase();
    const descriptiveMetadata = `${page.title || ""} ${page.description || ""}`.toLowerCase();
    const extractMetadata = (page.extract || "").toLowerCase();
    const allMetadata = `${categoryMetadata} ${descriptiveMetadata} ${extractMetadata}`;

    const signalMatches = config.signals.filter((signal) => allMetadata.includes(signal.toLowerCase()));
    const categorySignals = (categorySignalMap[topic] || []).filter((signal) => allMetadata.includes(signal.toLowerCase()));

    if (signalMatches.length >= 2 || categorySignals.length >= 2) {
      return true;
    }

    if (signalMatches.length === 1 && categorySignals.length >= 1) {
      return true;
    }

    return categorySignals.length > 0;
  };

  const showTopicStatus = (message, type = "") => {
    if (!topicSearchStatus) return;

    topicSearchStatus.textContent = message;
    topicSearchStatus.className = `topic-search-status ${type}`.trim();
  };

  const setTopicLoading = (isLoading) => {
    if (!topicSearchInput || !topicSearchButton) return;

    topicSearchInput.disabled = isLoading || !selectedTopic;
    topicSearchButton.disabled = isLoading || !selectedTopic;
    topicSearchButton.textContent = isLoading ? "Searching..." : "Search Topic";
    discoverTopicButton.disabled = isLoading || !selectedTopic;
    discoverTopicButton.textContent = isLoading ? "Finding a topic..." : "✨ Discover Something New";
  };

  const setTopicCategory = (topic, button) => {
    const config = topicSearchConfig[topic];

    if (!config || !detailPanel || !detailTitle || !detailText || !topicSearchInput || !selectedTopicLabel) return;

    selectedTopic = topic;
    selectedTopicLabel.textContent = config.label;
    topicSearchInput.placeholder = config.placeholder;
    topicSearchInput.disabled = false;
    topicSearchButton.disabled = false;
    discoverTopicButton.disabled = false;
    detailTitle.textContent = `${config.label} discovery`;
    detailText.textContent = `Search any ${config.label.toLowerCase()} topic and discover a simple explanation.`;
    topicResult.hidden = true;
    relatedTopicsEl.hidden = true;
    topicResultThumbnail.hidden = true;
    renderRecentSearches(topic);
    showTopicStatus("Type a topic to begin.");
    document.querySelectorAll(".topic-card").forEach((card) => card.classList.remove("is-selected"));
    button.closest(".topic-card")?.classList.add("is-selected");
  };

  const searchWikipedia = async (query, topic, requestId, isDiscovery = false) => {
    const config = topicSearchConfig[topic];
    const normalizedQuery = query.trim().toLowerCase();

    const searchParams = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      srnamespace: "0",
      srlimit: "5",
      format: "json",
      origin: "*"
    });
    const searchResponse = await fetch(`${TOPIC_API_URL}?${searchParams}`);

    if (!searchResponse.ok) throw new Error("The learning library is unavailable right now.");

    const searchData = await searchResponse.json();
    const searchResults = searchData.query?.search || [];
    const searchResult = isDiscovery
      ? searchResults[Math.floor(Math.random() * searchResults.length)]
      : searchResults[0];

    if (!searchResult) throw new Error("No useful information was found. Try another topic.");

    const pageParams = new URLSearchParams({
      action: "query",
      prop: "extracts|info|categories|pageimages|description",
      exintro: "1",
      explaintext: "1",
      inprop: "url",
      titles: searchResult.title,
      cllimit: "20",
      clshow: "!hidden",
      format: "json",
      origin: "*",
      pageimages: "1",
      pithumbsize: "320"
    });
    const pageResponse = await fetch(`${TOPIC_API_URL}?${pageParams}`);

    if (!pageResponse.ok) throw new Error("The topic explanation could not be loaded. Please try again.");

    const pageData = await pageResponse.json();
    const page = Object.values(pageData.query?.pages || {})[0];

    if (requestId !== topicRequestId || !page || page.missing !== undefined || !page.extract) {
      throw new Error("No useful information was found. Try another topic.");
    }

    if (!topicMatchesCategory(page, topic)) {
      throw new Error(`${config.icon} That topic doesn't seem to belong to ${config.label}. Try searching for a ${config.label.toLowerCase()} or ${config.label.toLowerCase()}-related topic!`);
    }

    return {
      title: decodeTopicValue(page.title),
      explanation: decodeTopicValue(page.extract),
      url: page.fullurl || `https://simple.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
      thumbnail: page.thumbnail?.source || "",
      relatedTopics: (searchData.query?.search || [])
        .filter((result) => result.title !== searchResult.title)
        .slice(0, 4)
        .map((result) => result.title)
    };
  };

  const fetchValidatedRelatedTopics = async (relatedTopics, topic) => {
    const uniqueTopics = [...new Set((relatedTopics || []).filter(Boolean))];

    if (uniqueTopics.length === 0) {
      return [];
    }

    const validatedTopics = await Promise.all(uniqueTopics.map(async (title) => {
      const pageParams = new URLSearchParams({
        action: "query",
        prop: "extracts|categories|description",
        exintro: "1",
        explaintext: "1",
        titles: title,
        cllimit: "20",
        clshow: "!hidden",
        format: "json",
        origin: "*"
      });

      try {
        const pageResponse = await fetch(`${TOPIC_API_URL}?${pageParams}`);
        if (!pageResponse.ok) return null;

        const pageData = await pageResponse.json();
        const page = Object.values(pageData.query?.pages || {})[0];

        if (!page || page.missing !== undefined || !page.extract) return null;

        return topicMatchesCategory(page, topic) ? decodeTopicValue(page.title) : null;
      } catch (error) {
        return null;
      }
    }));

    return [...new Set(validatedTopics.filter(Boolean).slice(0, 4))];
  };

  const renderTopicResult = async (result, query) => {
    const validatedRelatedTopics = result.isLibraryResult
      ? (result.relatedTopics || []).filter(Boolean).slice(0, 4)
      : await fetchValidatedRelatedTopics(result.relatedTopics, selectedTopic);
    const resultSubject = [result.subject || (selectedTopic && topicSearchConfig[selectedTopic]?.label) || "Explore", result.region || result.continent]
      .filter(Boolean)
      .join(" • ");
    const resultLevel = [result.level, result.difficulty].filter(Boolean).join(" • ") || "General";

    topicResultMeta.textContent = `${resultSubject} • ${resultLevel}`;
    topicResultTitle.textContent = result.title;
    topicResultExplanation.textContent = result.explanation;
    topicResultLink.href = result.url || "#";
    topicResultLink.textContent = result.isLibraryResult ? `Source: ${result.source || "Learning Library"}` : "Learn More";
    topicResultLink.target = result.isLibraryResult ? "" : "_blank";
    topicResultLink.rel = result.isLibraryResult ? "" : "noreferrer";
    if (result.thumbnail) {
      topicResultThumbnail.src = result.thumbnail;
      topicResultThumbnail.alt = `Illustration for ${result.title}`;
      topicResultThumbnail.hidden = false;
    } else {
      topicResultThumbnail.hidden = true;
    }
    relatedTopicListEl.innerHTML = "";
    validatedRelatedTopics.forEach((relatedTopic) => {
      const relatedButton = document.createElement("button");
      relatedButton.type = "button";
      relatedButton.className = "related-topic-button";
      relatedButton.textContent = relatedTopic;
      relatedButton.addEventListener("click", () => {
        topicSearchInput.value = relatedTopic;
        handleTopicSearch(relatedTopic);
      });
      relatedTopicListEl.appendChild(relatedButton);
    });
    relatedTopicsEl.hidden = validatedRelatedTopics.length === 0;
    topicResult.hidden = false;
    saveRecentSearch(selectedTopic, query);
    renderRecentSearches(selectedTopic);
    showTopicStatus("Topic found! Keep exploring.", "success");
  };

  const handleTopicSearch = async (providedQuery = "") => {
    const query = (providedQuery || topicSearchInput?.value || "").trim();

    if (!selectedTopic || !query) {
      showTopicStatus("Choose a category and type a topic to search.", "error");
      return;
    }

    topicRequestId += 1;
    const requestId = topicRequestId;
    setTopicLoading(true);
    topicResult.hidden = true;
    showTopicStatus("Looking through the learning library...");

    try {
      const libraryMatches = getExpandedLibraryMatches(query, selectedTopic);
      let result = libraryMatches.length > 0 ? createLibraryTopicResult(libraryMatches[0]) : null;
      if (!result) result = await searchWikipedia(query, selectedTopic, requestId);

      if (requestId !== topicRequestId) return;
      await renderTopicResult(result, query);
    } catch (error) {
      if (requestId !== topicRequestId) return;
      showTopicStatus(error.message || "We could not find that topic. Please try again.", "error");
    } finally {
      if (requestId === topicRequestId) setTopicLoading(false);
    }
  };

  const discoverTopic = async () => {
    const config = topicSearchConfig[selectedTopic];
    if (!config) return;

    topicSearchInput.value = "";
    setTopicLoading(true);
    showTopicStatus("Searching for a surprise topic...");

    try {
      let result = null;
      let requestId;
      const previousDiscovery = getLastDiscovery(selectedTopic);

      for (let attempt = 0; attempt < 5; attempt += 1) {
        topicRequestId += 1;
        requestId = topicRequestId;
        const candidate = await searchWikipedia(config.discoverQuery, selectedTopic, requestId, true);
        if (candidate.title !== previousDiscovery) {
          result = candidate;
          break;
        }
      }

      if (!result) {
        throw new Error("We could not find a new topic right now. Please try again.");
      }

      topicSearchInput.value = result.title;
      renderTopicResult(result, result.title);
      saveLastDiscovery(selectedTopic, result.title);
    } catch (error) {
      showTopicStatus(error.message || "We could not find a surprise topic. Please try again.", "error");
    } finally {
      setTopicLoading(false);
    }
  };

  const creativeIdeas = sharedSiteData.creativeIdeas || {
    drawing: {
      title: "Drawing Ideas",
      text: "Draw a magical city in the clouds with colorful homes, flying cars, and a rainbow sky. Add your own dream characters and silly details."
    },
    writing: {
      title: "Writing Activities",
      text: "Write a short story about a brave little explorer who finds a hidden forest full of talking animals and glowing plants."
    },
    craft: {
      title: "Craft Ideas",
      text: "Create a paper rocket or a colorful animal mask using cardboard, paper, scissors, glue, and bright decorations."
    },
    challenge: {
      title: "Creative Challenges",
      text: "Design your own superhero with a special talent, a cool costume, and a mission to help the world in a kind and creative way."
    }
  };

  const creativeActivities = {
    drawing: {
      id: "drawing",
      title: "Drawing Ideas",
      label: "Drawing Studio",
      detailText: "Sketch anything you imagine with a rainbow of colors, erase tools, and a fresh blank canvas.",
      prompts: [
        "Draw your dream house.",
        "Draw an imaginary animal.",
        "Draw a robot from the future.",
        "Draw a magical forest.",
        "Draw your own planet."
      ]
    },
    writing: {
      id: "writing",
      title: "Writing Activities",
      label: "Writing Studio",
      detailText: "Write a story, invent a world, or create a character with your own imagination.",
      prompts: [
        "Write a short adventure story.",
        "Imagine you discovered a secret planet.",
        "Create your own superhero.",
        "Write a story about a talking animal.",
        "Describe a world where robots help everyone."
      ]
    },
    craft: {
      id: "craft",
      title: "Craft Ideas",
      label: "Craft Workshop",
      detailText: "Follow simple, child-safe steps to create something bright and fun.",
      prompts: []
    },
    challenge: {
      id: "challenge",
      title: "Creative Challenges",
      label: "Challenge Lab",
      detailText: "Invent, imagine, and design a new idea without limits.",
      prompts: []
    }
  };

  const craftIdeaCollection = [
    {
      id: "paper-rocket",
      title: "Paper Rocket",
      description: "Fold, tape, and decorate your own space rocket.",
      difficulty: "Easy",
      time: "15 minutes",
      materials: ["Paper", "Tape", "Scissors", "Markers"],
      safety: "Use child-safe scissors and adult help if needed.",
      steps: [
        "Fold the paper into a rocket shape.",
        "Tape the edges to keep it sturdy.",
        "Cut or draw a window and fins.",
        "Decorate your rocket with stripes, stars, and a name."
      ]
    },
    {
      id: "animal-mask",
      title: "Animal Mask",
      description: "Turn a paper plate or card into a playful animal mask.",
      difficulty: "Medium",
      time: "20 minutes",
      materials: ["Cardboard", "Elastic", "Markers", "Glue"],
      safety: "Use glue carefully and keep small bits away from little mouths.",
      steps: [
        "Cut out the mask shape and eye holes.",
        "Draw the animal features and color them brightly.",
        "Attach the elastic or string.",
        "Wear your brand-new animal mask and roar!"
      ]
    },
    {
      id: "planet-mobile",
      title: "Planet Mobile",
      description: "Create a hanging solar system with paper planets.",
      difficulty: "Medium",
      time: "25 minutes",
      materials: ["Paper", "String", "Tape", "Crayons"],
      safety: "Keep string lengths manageable for small hands.",
      steps: [
        "Cut circles for each planet and decorate them.",
        "Punch a small hole at the top of each circle.",
        "Thread the string through each planet.",
        "Hang them in order from the sun to the farthest planet."
      ]
    }
  ];

  const challengeIdeaCollection = [
    {
      id: "new-invention",
      title: "Design a New Invention",
      description: "Invent a helpful tool that makes everyday life more fun or easier.",
      time: "15–20 minutes",
      instructions: "Draw your invention, name it, and tell how it helps people.",
      workspace: "Think about what problem your invention solves and what makes it special."
    },
    {
      id: "create-character",
      title: "Create a Character",
      description: "Invent a new character with a personality, powers, and a favorite hobby.",
      time: "10–15 minutes",
      instructions: "Describe the character's looks, talent, and what makes them brave.",
      workspace: "Make your character extra colorful and unforgettable."
    },
    {
      id: "comic-idea",
      title: "Make a Comic Idea",
      description: "Plan a short comic strip with a fun beginning, middle, and ending.",
      time: "15 minutes",
      instructions: "Create 3–5 comic boxes and show a problem and a clever solution.",
      workspace: "Use speech bubbles and action scenes to tell the story."
    },
    {
      id: "new-planet",
      title: "Invent a New Planet",
      description: "Imagine a planet with amazing weather, creatures, and landscapes.",
      time: "10–20 minutes",
      instructions: "Describe the planet's name, colors, and the kind of life that lives there.",
      workspace: "Let your imagination turn your world into something magical."
    }
  ];

  const triggerCelebrationBurst = (message = "Amazing! You did it!") => {
    const existingBurst = document.querySelector(".celebration-burst-layer");
    if (existingBurst) existingBurst.remove();

    const burst = document.createElement("div");
    burst.className = "celebration-burst-layer";
    document.body.appendChild(burst);

    const pieceCount = 42;
    const colors = ["#FACC15", "#FF6B6B", "#3B82F6", "#22C55E", "#8B5CF6", "#EC4899", "#F97316"];

    for (let index = 0; index < pieceCount; index += 1) {
      const piece = document.createElement("span");
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 1.8;
      const size = 6 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 130;
      const delay = Math.random() * 0.25;
      piece.className = "celebration-piece";
      piece.style.left = `${left}%`;
      piece.style.setProperty("--piece-size", `${size}px`);
      piece.style.setProperty("--piece-color", colors[index % colors.length]);
      piece.style.setProperty("--piece-duration", `${duration}s`);
      piece.style.setProperty("--piece-drift", `${drift}px`);
      piece.style.animationDelay = `${delay}s`;
      burst.appendChild(piece);
    }

    const toast = document.createElement("div");
    toast.className = "celebration-toast";
    toast.textContent = message;
    burst.appendChild(toast);

    setTimeout(() => {
      burst.remove();
    }, 2600);
  };

  const searchCatalog = Array.isArray(sharedSiteData.searchCatalog) && sharedSiteData.searchCatalog.length > 0
    ? sharedSiteData.searchCatalog
    : [
        { title: "Science", category: "Explore", description: "Discover experiments, ideas, and how the world works.", target: "explore.html" },
        { title: "Animals", category: "Explore", description: "Meet amazing creatures and learn about animal life.", target: "explore.html" },
        { title: "Space", category: "Explore", description: "Explore planets, stars, moons, and galaxies.", target: "explore.html" },
        { title: "Nature", category: "Explore", description: "Learn about forests, oceans, weather, and our planet.", target: "explore.html" },
        { title: "History", category: "Explore", description: "Journey into stories, inventions, and events from the past.", target: "explore.html" },
        { title: "Geography", category: "Explore", description: "Explore countries, landmarks, maps, and places around the world.", target: "explore.html" },
        { title: "Drawing Ideas", category: "Creative Corner", description: "Sketch magical gardens, friendly robots, and space adventures.", target: "creative.html" },
        { title: "Writing Activities", category: "Creative Corner", description: "Write mini stories about explorers and time-traveling animals.", target: "creative.html" },
        { title: "Craft Ideas", category: "Creative Corner", description: "Create paper planets, animal masks, and recycled art.", target: "creative.html" },
        { title: "Creative Challenges", category: "Creative Corner", description: "Build an invention or design a superhero with a special talent.", target: "creative.html" },
        { title: "Games & Quizzes", category: "Games & Quizzes", description: "Play educational quizzes and test what you know.", target: "games.html" },
        { title: "Challenges", category: "Challenges", description: "Complete daily quests and missions to earn points.", target: "challenges.html" },
        { title: "Fun Facts", category: "Fun Facts", description: "Learn short and surprising facts about the world.", target: "index.html" }
      ];

  const getSavedProfile = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("youngExplorerProfile") || "null");
      if (!saved || typeof saved !== "object") {
        return { name: "", age: "", grade: "", learningLevel: "" };
      }
      const profile = {
        name: typeof saved.name === "string" ? saved.name.trim() : "",
        age: saved.age !== undefined && saved.age !== null ? String(saved.age).trim() : "",
        grade: typeof saved.grade === "string" ? saved.grade.trim() : ""
      };
      return { ...profile, learningLevel: getLearningLevel(profile.grade) };
    } catch (error) {
      return { name: "", age: "", grade: "", learningLevel: "" };
    }
  };

  const saveProfile = (profile) => {
    const cleanProfile = {
      name: String(profile.name || "").trim(),
      age: profile.age !== undefined && profile.age !== null && String(profile.age).trim() ? String(profile.age).trim() : "",
      grade: String(profile.grade || "").trim()
    };
    cleanProfile.learningLevel = getLearningLevel(cleanProfile.grade);
    localStorage.setItem("youngExplorerProfile", JSON.stringify(cleanProfile));
    return cleanProfile;
  };

  const getLearningLevel = (gradeValue = "") => {
    const normalized = String(gradeValue || "").trim();
    if (["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"].includes(normalized)) return "Primary";
    if (["7th Grade", "8th Grade", "9th Grade", "JSS1", "JSS2", "JSS3"].includes(normalized)) return "Middle";
    if (["10th Grade", "11th Grade", "12th Grade", "SS1", "SS2", "SS3"].includes(normalized)) return "Senior";
    return "";
  };

  const getProfileGradeBand = (gradeValue = "") => {
    const learningLevel = getLearningLevel(gradeValue);
    if (learningLevel === "Primary") return "lower";
    if (learningLevel === "Senior") return "higher";
    return "middle";
  };

  const getGradeBasedQuestionLevels = (gradeValue = "") => {
    const band = getProfileGradeBand(gradeValue);
    if (band === "lower") return ["JSS1", "JSS2"];
    if (band === "higher") return ["SS1", "SS2", "SS3"];
    return ["JSS2", "JSS3", "SS1"];
  };

  const inferQuestionLevel = (index) => {
    if (index < 25) return "JSS1";
    if (index < 50) return "JSS2";
    if (index < 75) return "JSS3";
    if (index < 90) return "SS1";
    if (index < 110) return "SS2";
    return "SS3";
  };

  const personalizeExplanation = (item) => {
    const savedProfile = getSavedProfile();
    const band = getProfileGradeBand(savedProfile.grade);
    const topicName = String(item.topic || "").toLowerCase();

    if (band === "lower" && topicName.includes("dna")) {
      return "DNA is like an instruction guide inside living cells that helps tell the body how to grow and work.";
    }

    if (band === "lower" && topicName.includes("newton")) {
      return "Newton's laws explain how forces can make objects move, stop, or change direction.";
    }

    if (band === "lower" && topicName.includes("quadratic")) {
      return "A quadratic equation is a math equation with a squared term that helps describe curves and patterns.";
    }

    if (band === "lower" && topicName.includes("vectors")) {
      return "Vectors describe a value with both size and direction, like a push or a movement in a particular direction.";
    }

    return item.explanation || "This learning topic helps build strong understanding in science, mathematics, or technology.";
  };

  const getExpandedLibraryMatches = (query, topic = "") => {
    const normalizeSearchText = (value) => String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const stopWords = new Set(["a", "an", "the", "about", "and", "are", "does", "do", "how", "i", "is", "me", "of", "tell", "that", "this", "was", "what", "where", "who", "work"]);
    const trimmedQuery = normalizeSearchText(query);
    const queryTokens = trimmedQuery.split(" ").filter((word) => word.length > 1 && !stopWords.has(word));
    if (!trimmedQuery || queryTokens.length === 0 || !Array.isArray(expandedExploreLibrary) || expandedExploreLibrary.length === 0) return [];

    return expandedExploreLibrary
      .map((item) => {
        const itemTopic = normalizeSearchText(item.topic);
        const itemSubject = normalizeSearchText(item.subject);
        const keywords = (item.keywords || []).map(normalizeSearchText).filter(Boolean);
        let score = 0;
        let contentMatched = false;

        if (itemTopic === trimmedQuery) {
          score += 10000;
          contentMatched = true;
        } else if (itemTopic.includes(trimmedQuery) || (itemTopic.length > 2 && trimmedQuery.includes(itemTopic))) {
          score += 5000;
          contentMatched = true;
        }

        keywords.forEach((keyword) => {
          if (keyword === trimmedQuery) {
            score += 3000;
            contentMatched = true;
          } else if (keyword.includes(trimmedQuery) || trimmedQuery.includes(keyword)) {
            score += 1500;
            contentMatched = true;
          }
        });

        queryTokens.forEach((token) => {
          if (itemTopic.split(" ").includes(token)) {
            score += 350;
            contentMatched = true;
          }
          if (keywords.some((keyword) => keyword.split(" ").includes(token))) {
            score += 110;
            contentMatched = true;
          }
        });

        if (itemSubject === trimmedQuery) {
          score += 80;
          contentMatched = true;
        }
        if (contentMatched && topic && itemSubject === normalizeSearchText(topicSearchConfig[topic]?.label)) score += 25;
        if (contentMatched && item.level === getSavedProfile().learningLevel) score += 10;

        return { ...item, score };
      })
      .filter((item) => item.score >= 80)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const createLibraryTopicResult = (item) => ({
    title: item.topic,
    explanation: personalizeExplanation(item),
    url: "#",
    thumbnail: "",
    relatedTopics: Array.isArray(item.relatedTopics) && item.relatedTopics.length > 0
      ? item.relatedTopics
      : expandedExploreLibrary
          .filter((candidate) => candidate.subject === item.subject && candidate.topic !== item.topic)
          .map((candidate) => candidate.topic),
    subject: item.subject,
    continent: item.continent,
    region: item.region,
    level: item.level,
    difficulty: item.difficulty,
    source: item.source,
    isLibraryResult: true
  });

  const openLibraryTopic = async (item) => {
    const scienceButton = document.querySelector('.explore-btn[data-topic="science"]');
    if (!scienceButton || !detailPanel) return;

    setTopicCategory("science", scienceButton);
    detailPanel.hidden = false;
    if (topicSearchInput) topicSearchInput.value = item.topic;
    await renderTopicResult(createLibraryTopicResult(item), item.topic);
    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const getPersonalizedQuestionBank = () => {
    const bank = Array.isArray(sharedSiteData.quizQuestions) && sharedSiteData.quizQuestions.length > 0
      ? sharedSiteData.quizQuestions.map((question, index) => ({
          ...question,
          level: question.level || inferQuestionLevel(index),
          answer: question.answer || question.options?.[question.correctIndex] || ""
        }))
      : [
          { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correctIndex: 1, explanation: "Mars is nicknamed the Red Planet because of its reddish appearance.", level: "JSS1" },
          { question: "Which animal is the largest mammal on Earth?", options: ["Elephant", "Blue whale", "Giraffe", "Dolphin"], correctIndex: 1, explanation: "The blue whale is the largest mammal and the largest animal on Earth.", level: "JSS2" },
          { question: "What do plants need to make their own food?", options: ["Sand", "Sunlight", "Plastic", "Rocks"], correctIndex: 1, explanation: "Plants use sunlight, water, and carbon dioxide to make food through photosynthesis.", level: "JSS1" }
        ];

    const savedProfile = getSavedProfile();
    const preferredLevels = getGradeBasedQuestionLevels(savedProfile.grade);
    const preferredQuestions = bank.filter((question) => preferredLevels.includes(question.level));
    const relatedQuestions = bank.filter((question) => !preferredLevels.includes(question.level));
    return [...preferredQuestions, ...relatedQuestions];
  };

  const renderSearchResults = (query) => {
    if (!searchResultsEl) return;

    const normalizedQuery = String(query || "").trim().toLowerCase();
    searchResultsEl.innerHTML = "";

    if (!normalizedQuery) {
      searchResultsEl.hidden = true;
      return;
    }

    const matchingResults = searchCatalog.filter((item) => {
      const searchableText = `${item.title} ${item.category} ${item.description}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    const libraryMatches = getExpandedLibraryMatches(normalizedQuery);
    const combinedResults = [...matchingResults, ...libraryMatches.map((item) => ({
      title: item.topic,
      category: item.subject,
      description: personalizeExplanation(item),
      target: "explore.html",
      level: item.level,
      difficulty: item.difficulty,
      region: item.region || item.continent,
      libraryItem: item
    }))];

    searchResultsEl.hidden = false;

    if (combinedResults.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "search-empty";
      emptyMessage.textContent = "No results found. Try another search!";
      searchResultsEl.appendChild(emptyMessage);
      return;
    }

    combinedResults.slice(0, 8).forEach((item) => {
      const result = document.createElement("article");
      result.className = "search-result";

      const resultContent = document.createElement("div");
      resultContent.className = "search-result-content";

      const category = document.createElement("p");
      category.className = "search-result-category";
      category.textContent = [item.category || "Explore", item.region].filter(Boolean).join(" • ");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const level = document.createElement("p");
      level.textContent = item.level || item.difficulty ? `Level: ${[item.level, item.difficulty].filter(Boolean).join(" • ")}` : "";

      const description = document.createElement("p");
      description.textContent = item.description;
      resultContent.append(category, title, level, description);

      const openLink = document.createElement(item.libraryItem ? "button" : "a");
      openLink.className = "text-link";
      if (item.libraryItem) {
        openLink.type = "button";
        openLink.textContent = "Open topic";
        openLink.addEventListener("click", () => openLibraryTopic(item.libraryItem));
      } else {
        openLink.href = item.target || "explore.html";
        openLink.textContent = item.target ? "Open section" : "Learn More";
      }

      result.append(resultContent, openLink);
      searchResultsEl.appendChild(result);
    });
  };

  const siteSearchForm = document.getElementById("site-search-form");

  if (siteSearchForm) {
    siteSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderSearchResults(siteSearchInput ? siteSearchInput.value : "");
    });
  }

  if (siteSearchInput) {
    siteSearchInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      renderSearchResults(siteSearchInput.value);
    });
  }

  const funFacts = Array.isArray(sharedSiteData.funFacts) && sharedSiteData.funFacts.length > 0
    ? sharedSiteData.funFacts
    : [
        {
          icon: "🔬",
          category: "Science",
          text: "Honey never spoils. Archaeologists have found jars of honey in ancient places that are still safe to eat."
        },
        {
          icon: "🐾",
          category: "Animals",
          text: "Octopuses have three hearts: two pump blood to the gills, and one pumps it to the rest of the body."
        },
        {
          icon: "🚀",
          category: "Space",
          text: "A day on Venus is longer than a year on Venus because the planet spins very slowly."
        },
        {
          icon: "🌿",
          category: "Nature",
          text: "Bamboo can grow incredibly quickly, with some kinds growing nearly a meter in a single day."
        },
        {
          icon: "📚",
          category: "History",
          text: "The ancient Egyptians used a picture-writing system called hieroglyphics to record stories and ideas."
        }
      ];

  let currentFactIndex = -1;
  let factCycle = [];
  let factCycleIndex = 0;
  let lastDisplayedFactIndex = null;

  const replayAnimation = (element, className) => {
    if (!element) return;

    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  };

  const shuffleArray = (items) => {
    const copy = [...items];

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }

    return copy;
  };

  const startNewFactCycle = () => {
    const nextCycle = shuffleArray(funFacts.map((_, index) => index));

    if (lastDisplayedFactIndex !== null && nextCycle[0] === lastDisplayedFactIndex) {
      const swapIndex = nextCycle.findIndex((value) => value !== lastDisplayedFactIndex);

      if (swapIndex !== -1) {
        [nextCycle[0], nextCycle[swapIndex]] = [nextCycle[swapIndex], nextCycle[0]];
      }
    }

    factCycle = nextCycle;
    factCycleIndex = 0;
  };

  const getNextFactIndex = () => {
    if (!factCycle.length || factCycleIndex >= factCycle.length) {
      startNewFactCycle();
    }

    const nextFact = factCycle[factCycleIndex];
    factCycleIndex += 1;
    return nextFact;
  };

  const renderFact = (factIndex) => {
    const fact = funFacts[factIndex];

    if (!fact || !factIconEl || !factCategoryEl || !factTextEl) return;

    currentFactIndex = factIndex;
    lastDisplayedFactIndex = factIndex;
    factIconEl.textContent = fact.icon;
    factCategoryEl.textContent = `${fact.icon} ${fact.category.toUpperCase()}`;
    factTextEl.textContent = fact.text;
    replayAnimation(factCardEl, "content-reveal");
  };

  const showAnotherFact = () => {
    const nextIndex = getNextFactIndex();
    renderFact(nextIndex);
  };

  if (anotherFactButton) {
    anotherFactButton.addEventListener("click", showAnotherFact);
  }

  startNewFactCycle();
  renderFact(getNextFactIndex());

  const quizQuestionEl = document.getElementById("quiz-question");
  const quizOptionsEl = document.getElementById("quiz-options");
  const quizFeedbackEl = document.getElementById("quiz-feedback");
  const scoreValueEl = document.getElementById("score-value");
  const quizProgressEl = document.getElementById("quiz-progress");
  const nextBtn = document.getElementById("next-btn");
  const playAgainBtn = document.getElementById("play-again-btn");
  const quizCompletionActionsEl = document.getElementById("quiz-completion-actions");
  const totalPointsValueEl = document.getElementById("total-points-value");
  const challengeButtons = document.querySelectorAll(".challenge-complete-btn");

  const challengeDefinitions = Array.isArray(sharedSiteData.challenges) && sharedSiteData.challenges.length > 0
    ? sharedSiteData.challenges
    : [
        {
          id: "brain-sprint",
          title: "Brain Sprint",
          description: "Race through quick thinking puzzles and word challenges to sharpen your brain.",
          category: "🧠 Brain Challenges",
          categoryKey: "brain",
          difficulty: "Easy",
          points: 10,
          icon: "🧠",
          unlockPoints: 0,
          instructions: [
            "Read each clue or puzzle carefully before answering.",
            "Think of the best answer and write or say it out loud.",
            "Try again if needed and keep your brain active."
          ]
        },
        {
          id: "science-sleuth",
          title: "Science Sleuth",
          description: "Observe a simple experiment and explain what happened using science clues.",
          category: "🔬 Science Challenges",
          categoryKey: "science",
          difficulty: "Medium",
          points: 20,
          icon: "🔬",
          unlockPoints: 0,
          instructions: [
            "Look closely at the experiment or observation.",
            "Notice the materials, steps, and result.",
            "Describe the science idea using your own words."
          ]
        },
        {
          id: "forest-finder",
          title: "Forest Finder",
          description: "Take a nature walk and identify interesting plants, birds, or trails nearby.",
          category: "🌍 Explorer Challenges",
          categoryKey: "explorer",
          difficulty: "Easy",
          points: 10,
          icon: "🌿",
          unlockPoints: 0,
          instructions: [
            "Go outside or look out a window to spot nature around you.",
            "Find one plant, animal, or natural feature to describe.",
            "Share what makes it special and where you found it."
          ]
        },
        {
          id: "creative-story-maker",
          title: "Creative Story Maker",
          description: "Invent a short story with a hero, a problem, and a clever solution.",
          category: "🎨 Creative Challenges",
          categoryKey: "creative",
          difficulty: "Medium",
          points: 20,
          icon: "🎨",
          unlockPoints: 0,
          instructions: [
            "Pick a character, a place, and a problem to solve.",
            "Write a short beginning, middle, and ending.",
            "Use your imagination to make the story exciting and kind."
          ]
        },
        {
          id: "code-puzzle",
          title: "Code Puzzle",
          description: "Follow a simple coding pattern and solve a sequence challenge with logic.",
          category: "💻 Coding Challenges",
          categoryKey: "coding",
          difficulty: "Hard",
          points: 30,
          icon: "💻",
          unlockPoints: 0,
          instructions: [
            "Notice the pattern and follow the steps in order.",
            "Try the sequence or puzzle using logic.",
            "Explain why your answer makes sense."
          ]
        },
        {
          id: "planet-collector",
          title: "Planet Collector",
          description: "Learn about planets and compare their features with a quick research challenge.",
          category: "🔬 Science Challenges",
          categoryKey: "science",
          difficulty: "Hard",
          points: 30,
          icon: "🪐",
          unlockPoints: 25,
          instructions: [
            "Choose one planet and gather two interesting facts about it.",
            "Compare it with Earth or another planet.",
            "Share what makes your chosen planet stand out."
          ]
        },
        {
          id: "city-explorer",
          title: "City Explorer",
          description: "Map out a route through your neighborhood and notice landmarks, helpers, and history.",
          category: "🌍 Explorer Challenges",
          categoryKey: "explorer",
          difficulty: "Medium",
          points: 20,
          icon: "🏙️",
          unlockPoints: 40,
          instructions: [
            "Look around your local area and find a landmark, park, or building.",
            "Plan a short route with at least three stops.",
            "Say what makes each place special."
          ]
        },
        {
          id: "art-ambassador",
          title: "Art Ambassador",
          description: "Design a poster or picture that teaches someone something new in a colorful way.",
          category: "🎨 Creative Challenges",
          categoryKey: "creative",
          difficulty: "Easy",
          points: 10,
          icon: "🎨",
          unlockPoints: 55,
          instructions: [
            "Pick a topic you want to share with others.",
            "Create a colorful poster or illustration.",
            "Add one fact and one creative idea."
          ]
        },
        {
          id: "code-builder",
          title: "Code Builder",
          description: "Use simple steps to create a tiny pattern, map, or digital design with logic.",
          category: "💻 Coding Challenges",
          categoryKey: "coding",
          difficulty: "Medium",
          points: 20,
          icon: "💡",
          unlockPoints: 70,
          instructions: [
            "Break the task into small steps.",
            "Create the pattern or sequence using logic.",
            "Test your idea and explain the result."
          ]
        },
        {
          id: "master-explorer",
          title: "Master Explorer Challenge",
          description: "Lead a big discovery mission by combining science, creativity, and problem solving.",
          category: "🌍 Explorer Challenges",
          categoryKey: "explorer",
          difficulty: "Hard",
          points: 30,
          icon: "🏆",
          unlockPoints: 100,
          locked: true,
          instructions: [
            "Choose a big question you want to explore.",
            "Use what you know from science, creativity, and research.",
            "Share your findings in a clear and confident way."
          ]
        }
      ];

  const challengeState = {
    activeCategory: "all",
    selectedChallengeId: null,
    dailyChallengeId: null
  };

  const STORAGE_KEY = "youngExplorerProgress";
  const CHALLENGE_POINTS = 15;
  const QUIZ_POINTS = 10;
  const DISCOVERY_POINTS = 5;
  const ACTIVITY_POINTS = 10;
  const QUIZ_LENGTH = 5;
  const QUIZ_API_URL = "https://opentdb.com/api.php";
  const QUIZ_CATEGORY_IDS = [17, 27, 22, 23];

  const badgeDefinitions = Array.isArray(sharedSiteData.badgeDefinitions) && sharedSiteData.badgeDefinitions.length > 0
    ? sharedSiteData.badgeDefinitions
    : [
        { id: "first-explorer", icon: "🌱", name: "First Explorer", requirement: "25 points", description: "Earn your first round of explorer points.", isEarned: (savedProgress) => savedProgress.totalPoints >= 25, target: 25, getProgress: (savedProgress) => savedProgress.totalPoints, unit: "points" },
        { id: "curious-mind", icon: "🧠", name: "Curious Mind", requirement: "50 points", description: "Keep learning and growing your knowledge.", isEarned: (savedProgress) => savedProgress.totalPoints >= 50, target: 50, getProgress: (savedProgress) => savedProgress.totalPoints, unit: "points" },
        { id: "young-explorer", icon: "🌎", name: "Young Explorer", requirement: "100 points", description: "You are well on your way to explorer greatness.", isEarned: (savedProgress) => savedProgress.totalPoints >= 100, target: 100, getProgress: (savedProgress) => savedProgress.totalPoints, unit: "points" },
        { id: "quiz-master", icon: "🏆", name: "Quiz Master", requirement: "Complete 10 quizzes to unlock.", description: "Your brain is growing with every quiz question.", isEarned: (savedProgress) => savedProgress.completedQuizzes >= 10 || savedProgress.totalPoints >= 150, target: 10, getProgress: (savedProgress) => savedProgress.completedQuizzes, unit: "quizzes" },
        { id: "challenge-champion", icon: "🎯", name: "Challenge Champion", requirement: "Complete 3 challenges.", description: "You are finishing challenges like a pro.", isEarned: (savedProgress) => savedProgress.completedChallenges.length >= 3, target: 3, getProgress: (savedProgress) => savedProgress.completedChallenges.length, unit: "challenges" },
        { id: "knowledge-seeker", icon: "🔎", name: "Knowledge Seeker", requirement: "Explore 5 topics.", description: "You are exploring the world with curiosity.", isEarned: (savedProgress) => savedProgress.exploredTopics.length >= 5, target: 5, getProgress: (savedProgress) => savedProgress.exploredTopics.length, unit: "topics" },
        { id: "creative-kid", icon: "🎨", name: "Creative Kid", requirement: "Complete 2 creative activities.", description: "Your creativity is shining bright.", isEarned: (savedProgress) => savedProgress.completedActivities.length >= 2, target: 2, getProgress: (savedProgress) => savedProgress.completedActivities.length, unit: "activities" },
        { id: "young-scientist", icon: "🔬", name: "Young Scientist", requirement: "Explore Science.", description: "You are discovering how the world works.", isEarned: (savedProgress) => savedProgress.exploredTopics.includes("science"), target: 1, getProgress: (savedProgress) => savedProgress.exploredTopics.includes("science") ? 1 : 0, unit: "science topics" },
        { id: "space-explorer", icon: "🚀", name: "Space Explorer", requirement: "Explore Space.", description: "Your imagination is reaching for the stars.", isEarned: (savedProgress) => savedProgress.exploredTopics.includes("space"), target: 1, getProgress: (savedProgress) => savedProgress.exploredTopics.includes("space") ? 1 : 0, unit: "space topics" }
      ];

  const achievementLevels = Array.isArray(sharedSiteData.achievementLevels) && sharedSiteData.achievementLevels.length > 0
    ? sharedSiteData.achievementLevels
    : [
        { name: "Beginner Explorer", icon: "🌱", points: 0 },
        { name: "Explorer", icon: "🔎", points: 25 },
        { name: "Knowledge Seeker", icon: "🧠", points: 50 },
        { name: "Young Explorer", icon: "🚀", points: 100 },
        { name: "Master Explorer", icon: "🌟", points: 150 }
      ];

  const getSavedProgress = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
      return {
        totalPoints: Number.isFinite(saved.totalPoints) ? saved.totalPoints : 0,
        completedChallenges: Array.isArray(saved.completedChallenges) ? saved.completedChallenges : [],
        completedActivities: Array.isArray(saved.completedActivities) ? saved.completedActivities : [],
        exploredTopics: Array.isArray(saved.exploredTopics) ? saved.exploredTopics : [],
        completedQuizzes: Number.isFinite(saved.completedQuizzes) ? saved.completedQuizzes : 0,
        quizQuestionHistory: Array.isArray(saved.quizQuestionHistory) ? saved.quizQuestionHistory : [],
        learningStreak: Number.isFinite(saved.learningStreak) ? saved.learningStreak : 0,
        lastActivityDate: saved.lastActivityDate || "",
        currentExplorerLevel: saved.currentExplorerLevel || "Beginner Explorer"
      };
    } catch (error) {
      return {
        totalPoints: 0,
        completedChallenges: [],
        completedActivities: [],
        exploredTopics: [],
        completedQuizzes: 0,
        quizQuestionHistory: [],
        learningStreak: 0,
        lastActivityDate: "",
        currentExplorerLevel: "Beginner Explorer"
      };
    }
  };

  const saveProgress = (progressState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
  };

  const getCurrentExplorerLevel = (savedProgress) => {
    return achievementLevels.reduce((current, level) => (savedProgress.totalPoints >= level.points ? level : current), achievementLevels[0]);
  };

  const getNextExplorerLevel = (savedProgress) => {
    const current = getCurrentExplorerLevel(savedProgress);
    const currentIndex = achievementLevels.findIndex((level) => level.name === current.name);
    return currentIndex < achievementLevels.length - 1 ? achievementLevels[currentIndex + 1] : null;
  };

  const getBadgeProgress = (badge, savedProgress) => {
    const currentValue = typeof badge.getProgress === "function" ? badge.getProgress(savedProgress) : 0;
    const numericValue = Number.isFinite(currentValue) ? currentValue : currentValue ? 1 : 0;
    const targetValue = Number.isFinite(badge.target) ? badge.target : 1;
    return {
      current: numericValue,
      target: targetValue,
      percent: Math.min(100, Math.round((numericValue / targetValue) * 100))
    };
  };

  let progress = getSavedProgress();
  let unlockedBadgeNames = new Set();
  let streakToastTimer = null;

  const syncTotalPointsDisplay = () => {
    if (totalPointsValueEl) totalPointsValueEl.textContent = String(progress.totalPoints);
    if (statTotalPointsEl) statTotalPointsEl.textContent = String(progress.totalPoints);
  };

  const updateLearningStreak = () => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const previousDay = progress.lastActivityDate || "";

    if (!previousDay) {
      progress.learningStreak = 1;
      progress.lastActivityDate = todayKey;
      return;
    }

    if (previousDay === todayKey) {
      return;
    }

    const previousDate = new Date(`${previousDay}T00:00:00`);
    const todayDate = new Date(`${todayKey}T00:00:00`);
    const diffDays = Math.round((todayDate - previousDate) / 86400000);

    if (diffDays === 1) {
      progress.learningStreak += 1;
    } else if (diffDays > 1) {
      progress.learningStreak = Math.max(1, progress.learningStreak);
    }

    progress.lastActivityDate = todayKey;
  };

  const showAchievementCelebration = (badge) => {
    if (!achievementCelebrationEl || !badge) return;

    achievementCelebrationEl.hidden = false;
    achievementCelebrationEl.innerHTML = `
      <div class="celebration-icon" aria-hidden="true">🏆</div>
      <div class="celebration-text">
        <p>New achievement unlocked!</p>
        <strong>${badge.icon} ${badge.name}</strong>
        <span>${badge.description}</span>
      </div>
    `;
    achievementCelebrationEl.classList.remove("show");
    void achievementCelebrationEl.offsetWidth;
    achievementCelebrationEl.classList.add("show");

    if (streakToastTimer) clearTimeout(streakToastTimer);
    streakToastTimer = setTimeout(() => {
      achievementCelebrationEl.classList.remove("show");
      setTimeout(() => {
        achievementCelebrationEl.hidden = true;
      }, 260);
    }, 2200);
  };

  const renderAchievementDashboard = () => {
    const nextBadge = badgeDefinitions.find((badge) => !badge.isEarned(progress)) || null;
    const currentLevel = getCurrentExplorerLevel(progress);
    const nextLevel = getNextExplorerLevel(progress);
    const nextProgress = nextBadge ? getBadgeProgress(nextBadge, progress) : { current: 100, target: 100, percent: 100 };

    if (badgeCountValueEl) badgeCountValueEl.textContent = String(badgeDefinitions.filter((badge) => badge.isEarned(progress)).length);
    if (quizzesCompletedEl) quizzesCompletedEl.textContent = String(progress.completedQuizzes);
    if (challengesCompletedEl) challengesCompletedEl.textContent = String(progress.completedChallenges.length);
    if (activitiesCompletedEl) activitiesCompletedEl.textContent = String(progress.completedActivities.length);
    if (topicsExploredValueEl) topicsExploredValueEl.textContent = String(progress.exploredTopics.length);
    if (statQuizzesCompletedEl) statQuizzesCompletedEl.textContent = String(progress.completedQuizzes);
    if (statChallengesCompletedEl) statChallengesCompletedEl.textContent = String(progress.completedChallenges.length);
    if (statActivitiesCompletedEl) statActivitiesCompletedEl.textContent = String(progress.completedActivities.length);
    if (statTopicsExploredEl) statTopicsExploredEl.textContent = String(progress.exploredTopics.length);

    if (nextAchievementNameEl) {
      nextAchievementNameEl.textContent = nextBadge ? nextBadge.name : "All badges unlocked!";
    }

    if (nextAchievementProgressTextEl) {
      nextAchievementProgressTextEl.textContent = nextBadge
        ? `${nextProgress.current} / ${nextProgress.target} ${nextBadge.unit}`
        : "Completed";
    }

    if (nextAchievementProgressFillEl) {
      nextAchievementProgressFillEl.style.width = `${nextProgress.percent}%`;
    }

    if (nextAchievementDetailEl) {
      nextAchievementDetailEl.textContent = nextBadge
        ? `${nextBadge.description} Need ${nextBadge.requirement}.`
        : "You have reached every achievement in this explorer journey!";
    }

    if (learningStreakValueEl) {
      learningStreakValueEl.textContent = `🔥 ${progress.learningStreak}-Day Learning Streak`;
    }

    if (streakNoteEl) {
      streakNoteEl.textContent = progress.learningStreak > 0
        ? "Keep learning every day to build your streak and earn more confidence."
        : "Keep exploring to build your streak.";
    }

    if (explorerJourneyEl) {
      const journeyHtml = achievementLevels.map((level) => {
        const isCurrent = level.name === currentLevel.name;
        const isCompleted = progress.totalPoints >= level.points;
        const isNext = nextLevel && level.name === nextLevel.name;
        const levelClass = isCurrent ? "journey-step current" : isCompleted ? "journey-step complete" : "journey-step";
        const label = isCurrent ? "Current level" : isCompleted ? "Unlocked" : "Next up";
        return `
          <div class="${levelClass}">
            <span class="journey-icon" aria-hidden="true">${level.icon}</span>
            <span class="journey-name">${level.name}</span>
            <small>${isCurrent ? label : isNext ? "Next level" : isCompleted ? "Unlocked" : "Locked"}</small>
          </div>
        `;
      }).join("");
      explorerJourneyEl.innerHTML = journeyHtml;
    }
  };

  const renderBadgeCollections = () => {
    const unlockedBadges = badgeDefinitions.filter((badge) => badge.isEarned(progress));
    const lockedBadges = badgeDefinitions.filter((badge) => !badge.isEarned(progress));

    const renderBadgeCard = (badge, isUnlocked) => {
      const progressInfo = getBadgeProgress(badge, progress);
      const isNewlyUnlocked = isUnlocked && !unlockedBadgeNames.has(badge.id);

      return `
        <article class="badge-card ${isUnlocked ? "unlocked" : "locked"} ${isNewlyUnlocked ? "badge-new" : ""}">
          <div class="badge-card-icon" aria-hidden="true">${isUnlocked ? badge.icon : "🔒"}</div>
          <div class="badge-card-copy">
            <strong>${badge.name}</strong>
            <span>${isUnlocked ? badge.description : badge.requirement}</span>
          </div>
          <div class="badge-card-progress">${isUnlocked ? "Earned" : `${progressInfo.current} / ${progressInfo.target}`}</div>
        </article>
      `;
    };

    if (unlockedBadgeListEl) unlockedBadgeListEl.innerHTML = unlockedBadges.map((badge) => renderBadgeCard(badge, true)).join("") || '<p class="empty-state">No badges unlocked yet.</p>';
    if (lockedBadgeListEl) lockedBadgeListEl.innerHTML = lockedBadges.map((badge) => renderBadgeCard(badge, false)).join("") || '<p class="empty-state">All badges unlocked!</p>';

    unlockedBadgeNames = new Set(unlockedBadges.map((badge) => badge.id));
  };

  const renderAchievements = () => {
    renderAchievementDashboard();
    renderBadgeCollections();
  };

  const renderExplorerLearningMap = () => {
    if (!explorerLearningMapEl) return;

    const mapOrder = ["science", "animals", "space", "nature", "history", "geography"];
    const exploredSet = new Set(progress.exploredTopics || []);
    const isMasterComplete = mapOrder.every((topicKey) => exploredSet.has(topicKey));

    const mapNodes = [
      {
        key: "start",
        kind: "start",
        state: "available",
        label: "🚀 Start",
        detail: "Your adventure begins",
        tag: "Start"
      },
      ...mapOrder.map((topicKey) => {
        const config = topicSearchConfig[topicKey] || { icon: "✨", label: topicKey };
        const isCurrent = selectedTopic === topicKey;
        const isComplete = exploredSet.has(topicKey);
        const totalTopics = Math.max(1, Math.min(5, (config.signals || []).length || 5));
        const exploredValue = isComplete ? totalTopics : 0;

        return {
          key: topicKey,
          kind: "destination",
          state: isCurrent ? "current" : isComplete ? "complete" : "available",
          label: `${config.icon} ${config.label}`,
          detail: `${exploredValue} / ${totalTopics} explored`,
          tag: isCurrent ? "Current" : isComplete ? "Completed" : "Available"
        };
      }),
      {
        key: "master",
        kind: "master",
        state: isMasterComplete ? "complete" : "available",
        label: "🏆 Master Explorer",
        detail: isMasterComplete ? "You explored the whole journey!" : "Complete every destination",
        tag: isMasterComplete ? "Unlocked" : "Final Goal"
      }
    ];

    explorerLearningMapEl.innerHTML = mapNodes.map((node, index) => {
      const isClickable = node.kind === "destination";
      const content = `
        <div class="map-node-main">
          <span class="map-node-icon" aria-hidden="true">${node.kind === "start" ? "🚀" : node.kind === "master" ? "🏆" : (topicSearchConfig[node.key]?.icon || "✨")}</span>
          <div class="map-node-copy">
            <strong>${node.label}</strong>
            <small>${node.detail}</small>
          </div>
        </div>
        <span class="learning-map-tag">${node.tag}</span>
      `;

      const segment = `
        <button type="button" class="learning-map-node ${node.state} ${node.kind}" data-topic="${node.key}" ${isClickable ? "" : "disabled"} aria-label="${node.label}">
          ${content}
        </button>
        ${index < mapNodes.length - 1 ? '<span class="learning-map-connector" aria-hidden="true"></span>' : ''}
      `;

      return segment;
    }).join("");

    if (isMasterComplete && !explorerLearningMapEl.dataset.masterCelebrated) {
      explorerLearningMapEl.dataset.masterCelebrated = "true";
      const masterStatus = document.createElement("div");
      masterStatus.className = "learning-map-master-celebration";
      masterStatus.textContent = "✨ MASTER EXPLORER ✨";
      explorerLearningMapEl.appendChild(masterStatus);

      if (achievementCelebrationEl) {
        achievementCelebrationEl.hidden = false;
        achievementCelebrationEl.innerHTML = `
          <div class="celebration-icon" aria-hidden="true">🏆</div>
          <div class="celebration-text">
            <p>Master Explorer unlocked!</p>
            <strong>🌟 You explored the entire learning journey!</strong>
            <span>Keep learning and keep growing with every adventure.</span>
          </div>
        `;
        achievementCelebrationEl.classList.remove("show");
        void achievementCelebrationEl.offsetWidth;
        achievementCelebrationEl.classList.add("show");
      }
    }

    explorerLearningMapEl.querySelectorAll(".learning-map-node[data-topic]").forEach((button) => {
      const topicKey = button.dataset.topic;
      if (!topicKey || topicKey === "start" || topicKey === "master") return;

      button.addEventListener("click", () => {
        const detailPanel = document.getElementById("topic-detail");
        if (!detailPanel || !topicSearchConfig[topicKey]) return;

        const targetButton = document.querySelector(`.explore-btn[data-topic="${topicKey}"]`);
        if (targetButton) {
          setTopicCategory(topicKey, targetButton);
        } else {
          selectedTopic = topicKey;
          const config = topicSearchConfig[topicKey];
          const selectedLabel = document.getElementById("selected-topic-label");
          if (selectedLabel) selectedLabel.textContent = config.label;
          if (topicSearchInput) {
            topicSearchInput.placeholder = config.placeholder;
            topicSearchInput.disabled = false;
          }
        }

        detailPanel.hidden = false;
        detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        recordTopicDiscovery(topicKey);
        renderExplorerLearningMap();
      });
    });
  };

  const saveAndRefreshProgress = () => {
    const previousUnlocked = new Set(unlockedBadgeNames);
    updateLearningStreak();
    progress.currentExplorerLevel = getCurrentExplorerLevel(progress).name;
    saveProgress(progress);
    syncTotalPointsDisplay();
    renderAchievements();
    renderExplorerLearningMap();

    const newlyUnlocked = badgeDefinitions.filter((badge) => badge.isEarned(progress) && !previousUnlocked.has(badge.id));
    if (newlyUnlocked.length > 0) {
      showAchievementCelebration(newlyUnlocked[0]);
    }
  };

  const recordTopicDiscovery = (topic) => {
    if (!topic || progress.exploredTopics.includes(topic)) return;

    progress.exploredTopics.push(topic);
    progress.totalPoints += DISCOVERY_POINTS;
    saveAndRefreshProgress();
  };

  const recordCreativeActivity = (activity) => {
    if (!activity || progress.completedActivities.includes(activity)) return;

    progress.completedActivities.push(activity);
    progress.totalPoints += ACTIVITY_POINTS;
    saveAndRefreshProgress();
  };

  const updateChallengeButtons = () => {
    const visibleButtons = document.querySelectorAll(".challenge-complete-btn");

    visibleButtons.forEach((button) => {
      const challengeId = button.dataset.challengeId;
      const challenge = challengeDefinitions.find((item) => item.id === challengeId);
      const isCompleted = progress.completedChallenges.includes(challengeId);
      const isUnlocked = challenge ? !challenge.locked || progress.totalPoints >= (challenge.unlockPoints || 0) : true;
      const card = button.closest(".challenge-card");

      button.disabled = isCompleted || !isUnlocked;
      button.textContent = isCompleted ? "Completed" : isUnlocked ? "Start Challenge" : "Locked";
      button.classList.toggle("is-complete", isCompleted);
      button.classList.toggle("is-locked", !isUnlocked && !isCompleted);

      if (card) {
        card.classList.toggle("completed", isCompleted);
        card.classList.toggle("locked", !isUnlocked && !isCompleted);
      }
    });
  };

  const showChallengeCompletionMessage = (challenge) => {
    const celebrationEl = document.getElementById("achievement-celebration");

    if (!celebrationEl || !challenge) return;

    celebrationEl.hidden = false;
    celebrationEl.innerHTML = `
      <div class="celebration-icon" aria-hidden="true">🎉</div>
      <div class="celebration-text">
        <p>Challenge Complete!</p>
        <strong>⭐ +${challenge.points} Points</strong>
        <span>${challenge.title}</span>
      </div>
    `;
    celebrationEl.classList.remove("show");
    void celebrationEl.offsetWidth;
    celebrationEl.classList.add("show");

    if (streakToastTimer) clearTimeout(streakToastTimer);
    streakToastTimer = setTimeout(() => {
      celebrationEl.classList.remove("show");
      setTimeout(() => {
        celebrationEl.hidden = true;
      }, 260);
    }, 2200);
  };

  const getChallengeById = (challengeId) => challengeDefinitions.find((challenge) => challenge.id === challengeId) || null;

  const isChallengeUnlocked = (challenge) => !challenge || !challenge.locked || progress.totalPoints >= (challenge.unlockPoints || 0);

  const getDailyChallengeId = () => {
    const dayKey = new Date().toISOString().slice(0, 10);
    let total = 0;

    for (let index = 0; index < dayKey.length; index += 1) {
      total += dayKey.charCodeAt(index) * (index + 1);
    }

    return challengeDefinitions[Math.abs(total) % challengeDefinitions.length].id;
  };

  const renderChallengeProgress = () => {
    const progressTextEl = document.getElementById("challenge-progress-text");
    const progressFillEl = document.getElementById("challenge-progress-fill");

    if (!progressTextEl || !progressFillEl) return;

    const completedCount = challengeDefinitions.filter((challenge) => progress.completedChallenges.includes(challenge.id)).length;
    const totalCount = challengeDefinitions.length;
    const percent = Math.round((completedCount / totalCount) * 100);

    progressTextEl.textContent = `${completedCount} / ${totalCount} Challenges Completed`;
    progressFillEl.style.width = `${percent}%`;
  };

  const renderTodayChallenge = () => {
    const titleEl = document.getElementById("today-challenge-title");
    const descriptionEl = document.getElementById("today-challenge-description");
    const categoryEl = document.getElementById("today-challenge-category");
    const difficultyEl = document.getElementById("today-challenge-difficulty");
    const pointsEl = document.getElementById("today-challenge-points");
    const dateEl = document.getElementById("today-challenge-date");
    const startButton = document.getElementById("today-start-btn");

    if (!titleEl || !descriptionEl || !categoryEl || !difficultyEl || !pointsEl || !dateEl) return;

    const challengeId = challengeState.dailyChallengeId || getDailyChallengeId();
    challengeState.dailyChallengeId = challengeId;
    const challenge = getChallengeById(challengeId);

    if (!challenge) return;

    dateEl.textContent = new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    titleEl.textContent = challenge.title;
    descriptionEl.textContent = challenge.description;
    categoryEl.textContent = challenge.category;
    difficultyEl.textContent = `Difficulty: ${challenge.difficulty}`;
    pointsEl.textContent = `Points: ${challenge.points}`;
    startButton.disabled = progress.completedChallenges.includes(challenge.id) || !isChallengeUnlocked(challenge);
    startButton.textContent = progress.completedChallenges.includes(challenge.id) ? "Completed Today" : "Start Challenge";
  };

  const populateChallengeInstructions = (challengeId) => {
    const challenge = getChallengeById(challengeId);
    const panel = document.getElementById("challenge-instructions-panel");

    if (!panel || !challenge) return;

    challengeState.selectedChallengeId = challengeId;
    document.getElementById("challenge-instructions-title").textContent = challenge.title;
    document.getElementById("challenge-instructions-description").textContent = challenge.description;
    document.getElementById("challenge-instructions-category").textContent = `${challenge.category}`;
    document.getElementById("challenge-instructions-difficulty").textContent = `Difficulty: ${challenge.difficulty}`;
    document.getElementById("challenge-instructions-points").textContent = `Reward: ${challenge.points} points`;

    const listEl = document.getElementById("challenge-instructions-list");
    listEl.innerHTML = challenge.instructions.map((instruction) => `<li>${instruction}</li>`).join("");
    panel.hidden = false;

    const completeButton = document.getElementById("complete-started-challenge-btn");
    completeButton.disabled = progress.completedChallenges.includes(challenge.id) || !isChallengeUnlocked(challenge);
    completeButton.textContent = progress.completedChallenges.includes(challenge.id) ? "Completed" : "Complete Challenge";
  };

  const renderChallengeCards = () => {
    const challengeGrid = document.getElementById("challenge-grid");

    if (!challengeGrid) return;

    const visibleChallenges = challengeDefinitions.filter((challenge) => {
      const matchesCategory = challengeState.activeCategory === "all" || challenge.categoryKey === challengeState.activeCategory;
      return matchesCategory;
    });

    challengeGrid.innerHTML = visibleChallenges.map((challenge) => {
      const completed = progress.completedChallenges.includes(challenge.id);
      const unlocked = isChallengeUnlocked(challenge);
      const buttonText = completed ? "Completed" : unlocked ? "Start Challenge" : "Locked";
      const lockMessage = !unlocked ? `Reach ${challenge.unlockPoints} points to unlock` : "Ready to try";

      return `
        <article class="info-card challenge-card ${completed ? "completed" : ""} ${!unlocked ? "locked" : ""}" data-challenge-id="${challenge.id}">
          <div class="challenge-visual" aria-hidden="true">${challenge.icon}</div>
          <div class="challenge-topline">
            <span class="challenge-tag ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
            <span class="points">+${challenge.points} pts</span>
          </div>
          <div class="challenge-card-meta">
            <span class="challenge-category-pill">${challenge.category}</span>
            <span class="challenge-status-pill ${completed ? "done" : !unlocked ? "locked" : "ready"}">${completed ? "Completed" : !unlocked ? "Locked" : "Ready"}</span>
          </div>
          <h3>${challenge.title}</h3>
          <p>${challenge.description}</p>
          <small class="challenge-unlock-text">${completed ? "You earned this challenge." : lockMessage}</small>
          <button type="button" class="btn btn-small challenge-complete-btn ${completed ? "is-complete" : ""}" data-challenge-id="${challenge.id}" ${completed || !unlocked ? "disabled" : ""}>${buttonText}</button>
        </article>
      `;
    }).join("");

    challengeGrid.querySelectorAll(".challenge-complete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const challengeId = button.dataset.challengeId;
        const challenge = getChallengeById(challengeId);

        if (!challenge || !isChallengeUnlocked(challenge)) return;
        populateChallengeInstructions(challengeId);
      });
    });
  };

  const completeChallenge = (challengeId) => {
    const challenge = getChallengeById(challengeId);

    if (!challengeId) {
      return;
    }

    if (progress.completedChallenges.includes(challengeId)) {
      return;
    }

    if (!isChallengeUnlocked(challenge)) {
      return;
    }

    progress.completedChallenges.push(challengeId);
    progress.totalPoints += challenge ? challenge.points : CHALLENGE_POINTS;
    saveAndRefreshProgress();
    renderChallengeProgress();
    renderChallengeCards();
    renderTodayChallenge();
    if (challenge) {
      showChallengeCompletionMessage(challenge);
    }
    updateChallengeButtons();
  };

  if (currentPage === "challenges" || currentPage === "home" || document.getElementById("challenge-grid")) {
    const categoryButtons = document.querySelectorAll(".challenge-filter-btn");
    const closePanelButton = document.getElementById("challenge-close-btn");
    const completeStartedButton = document.getElementById("complete-started-challenge-btn");
    const todayStartButton = document.getElementById("today-start-btn");

    challengeState.dailyChallengeId = getDailyChallengeId();
    renderTodayChallenge();
    renderChallengeProgress();
    renderChallengeCards();
    updateChallengeButtons();

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        challengeState.activeCategory = button.dataset.category || "all";
        categoryButtons.forEach((item) => item.classList.toggle("active", item === button));
        renderChallengeCards();
      });
    });

    if (todayStartButton) {
      todayStartButton.addEventListener("click", () => {
        populateChallengeInstructions(challengeState.dailyChallengeId);
      });
    }

    if (closePanelButton) {
      closePanelButton.addEventListener("click", () => {
        const panel = document.getElementById("challenge-instructions-panel");
        if (panel) panel.hidden = true;
      });
    }

    if (completeStartedButton) {
      completeStartedButton.addEventListener("click", () => {
        completeChallenge(challengeState.selectedChallengeId || challengeState.dailyChallengeId);
        const panel = document.getElementById("challenge-instructions-panel");
        if (panel) panel.hidden = true;
      });
    }
  }

  const renderProfileWelcome = () => {
    const profile = getSavedProfile();
    const displayName = profile.name ? profile.name : "Explorer";
    const displayGrade = profile.grade ? profile.grade : "Explorer";
    const learningLevelNote = profile.learningLevel ? ` • ${profile.learningLevel} learning level` : "";

    if (profileWelcomeEl) {
      if (!profile.name || !profile.grade) {
        profileWelcomeEl.hidden = true;
        return;
      }

      profileWelcomeEl.hidden = false;
      profileWelcomeEl.innerHTML = `<strong>Welcome back, ${displayName}! 👋</strong><br><span>${displayGrade} Explorer${learningLevelNote}</span><br><small>Ready to discover something new today?</small>`;
    }

    if (editProfileButton) {
      editProfileButton.hidden = !profile.name;
    }
  };

  const closeProfileModal = () => {
    if (profileModal) profileModal.hidden = true;
  };

  const openProfileModal = () => {
    if (!profileModal || !profileNameInput || !profileGradeSelect) return;
    const profile = getSavedProfile();
    profileNameInput.value = profile.name || "";
    profileAgeInput.value = profile.age || "";
    profileGradeSelect.value = profile.grade || "";
    profileModal.hidden = false;
  };

  if (profileModal && learnerProfileForm) {
    learnerProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const profile = saveProfile({
        name: profileNameInput.value,
        age: profileAgeInput.value,
        grade: profileGradeSelect.value
      });

      if (!profile.name || !profile.grade) {
        return;
      }

      closeProfileModal();
      renderProfileWelcome();
    });
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      openProfileModal();
    });
  }

  if (currentPage === "achievements") {
    syncTotalPointsDisplay();
    renderAchievements();
  }

  if (explorerLearningMapEl) {
    renderExplorerLearningMap();
  }

  const savedProfile = getSavedProfile();
  if (savedProfile.name && savedProfile.grade) {
    renderProfileWelcome();
  } else if (profileModal) {
    openProfileModal();
  }

  const QUIZ_COUNT_OPTIONS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const QUIZ_TIME_PER_QUESTION = 36;

  let currentQuestionIndex = 0;
  let currentQuestion = null;
  let score = 0;
  let answered = false;
  let isLoadingQuestion = false;
  let quizCompletedThisSession = false;
  let categoryCursor = 0;
  let selectedQuestionCount = 5;
  let totalQuestionsInQuiz = 5;
  let quizTimeLimitSeconds = 180;
  let quizTimerSecondsRemaining = 180;
  let quizTimerId = null;
  let activeQuizQuestions = [];
  let questionsAnsweredThisQuiz = 0;

  const getQuestionBank = () => {
    if (Array.isArray(sharedSiteData.quizQuestions) && sharedSiteData.quizQuestions.length > 0) {
      return sharedSiteData.quizQuestions;
    }

    return [
      { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correctIndex: 1, explanation: "Mars is nicknamed the Red Planet because of its reddish appearance." },
      { question: "Which animal is the largest mammal on Earth?", options: ["Elephant", "Blue whale", "Giraffe", "Dolphin"], correctIndex: 1, explanation: "The blue whale is the largest mammal and the largest animal on Earth." },
      { question: "What do plants need to make their own food?", options: ["Sand", "Sunlight", "Plastic", "Rocks"], correctIndex: 1, explanation: "Plants use sunlight, water, and carbon dioxide to make food through photosynthesis." },
      { question: "Which gas do humans need to breathe?", options: ["Helium", "Oxygen", "Carbon dioxide", "Neon"], correctIndex: 1, explanation: "Humans need oxygen for respiration." },
      { question: "What is the capital city of France?", options: ["Rome", "Berlin", "Paris", "Madrid"], correctIndex: 2, explanation: "Paris is the capital city of France." }
    ];
  };

  const getQuestionTimeLimit = (questionCount) => Math.max(180, questionCount * QUIZ_TIME_PER_QUESTION);

  const buildQuizSelectionPanel = () => {
    const selectionPanel = document.getElementById("quiz-selection-panel");
    const questionArea = document.getElementById("quiz-question-area");

    if (!selectionPanel) return;

    selectionPanel.innerHTML = `
      <p class="quiz-selection-title">How many questions do you want to answer?</p>
      <div class="quiz-count-grid">
        ${QUIZ_COUNT_OPTIONS.map((count) => `
          <button type="button" class="quiz-count-btn ${count === selectedQuestionCount ? "selected" : ""}" data-question-count="${count}">${count}</button>
        `).join("")}
      </div>
      <button type="button" class="btn btn-primary" id="start-quiz-btn">Start Quiz 🚀</button>
    `;

    selectionPanel.querySelectorAll(".quiz-count-btn").forEach((button) => {
      button.addEventListener("click", () => {
        selectedQuestionCount = Number(button.dataset.questionCount);
        buildQuizSelectionPanel();
      });
    });

    const startButton = document.getElementById("start-quiz-btn");
    if (startButton) {
      startButton.addEventListener("click", () => {
        startQuizWithSelectedCount();
      });
    }

    if (questionArea) {
      questionArea.hidden = true;
    }
    selectionPanel.hidden = false;
  };

  const showQuizArea = () => {
    const selectionPanel = document.getElementById("quiz-selection-panel");
    const questionArea = document.getElementById("quiz-question-area");

    if (selectionPanel) selectionPanel.hidden = true;
    if (questionArea) questionArea.hidden = false;
  };

  const formatTimeRemaining = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const updateTimerDisplay = () => {
    const quizTimerEl = document.getElementById("quiz-timer");
    if (!quizTimerEl) return;

    quizTimerEl.textContent = `⏱️ Time Left: ${formatTimeRemaining(quizTimerSecondsRemaining)}`;
    quizTimerEl.classList.toggle("warning", quizTimerSecondsRemaining <= 60);
  };

  const clearQuizTimer = () => {
    if (quizTimerId) {
      clearInterval(quizTimerId);
      quizTimerId = null;
    }
  };

  const handleTimeExpired = () => {
    if (quizCompletedThisSession) return;
    clearQuizTimer();
    showFinalScore({ timeExpired: true });
  };

  const startQuizTimer = () => {
    clearQuizTimer();
    quizTimerId = setInterval(() => {
      quizTimerSecondsRemaining -= 1;
      updateTimerDisplay();

      if (quizTimerSecondsRemaining <= 0) {
        handleTimeExpired();
      }
    }, 1000);
  };

  const generateRandomQuizQuestions = (count) => {
    const bank = getPersonalizedQuestionBank();

    if (!bank.length) {
      throw new Error("The quiz question bank is empty. Please add more questions.");
    }

    if (count > bank.length) {
      throw new Error(`Only ${bank.length} unique questions are available. Choose a smaller quiz size.`);
    }

    const uniqueQuestions = [];
    const seen = new Set();

    for (const question of shuffleArray(bank)) {
      const questionKey = String(question.question || "").trim().toLowerCase();
      if (!questionKey || seen.has(questionKey)) continue;
      seen.add(questionKey);
      uniqueQuestions.push({ ...question, key: questionKey, level: question.level || inferQuestionLevel(uniqueQuestions.length) });
      if (uniqueQuestions.length >= count) break;
    }

    if (uniqueQuestions.length < count) {
      throw new Error("Not enough unique questions are available for the selected quiz size.");
    }

    return uniqueQuestions;
  };

  const startQuizWithSelectedCount = () => {
    if (!Number.isFinite(selectedQuestionCount) || selectedQuestionCount <= 0) return;

    totalQuestionsInQuiz = selectedQuestionCount;
    score = 0;
    answered = false;
    currentQuestionIndex = 0;
    quizCompletedThisSession = false;
    questionsAnsweredThisQuiz = 0;
    activeQuizQuestions = generateRandomQuizQuestions(selectedQuestionCount);
    quizTimeLimitSeconds = getQuestionTimeLimit(selectedQuestionCount);
    quizTimerSecondsRemaining = quizTimeLimitSeconds;
    updateTimerDisplay();
    showQuizArea();
    loadQuestion();
    startQuizTimer();
  };

  const setMenuState = (isOpen) => {
    if (!navMenu || !navToggle) return;

    navMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });
  }

  const closeMobileMenu = () => {
    if (window.innerWidth <= 900 && navMenu && navToggle) {
      setMenuState(false);
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    });
  });

  if (exploreButton && currentPage === "home") {
    exploreButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "explore.html";
    });
  }

  if (currentPage === "explore" || currentPage === "home") {
    topicButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const topic = button.dataset.topic;
        const topicInfo = topicDetails[topic];

        if (!topicInfo || !detailPanel || !detailTitle || !detailText) return;

        setTopicCategory(topic, button);
        detailPanel.hidden = false;
        recordTopicDiscovery(topic);

        detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        topicSearchInput.focus();
      });
    });

    if (topicSearchForm) {
      topicSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleTopicSearch();
      });
    }

    if (discoverTopicButton) {
      discoverTopicButton.addEventListener("click", discoverTopic);
    }

    if (topicSearchInput) {
      topicSearchInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();
        handleTopicSearch();
      });
    }
  }

  const creativeWorkspace = document.getElementById("creative-workspace");
  const creativeWorkspaceTitle = document.getElementById("creative-workspace-title");
  const creativeWorkspaceLabel = document.getElementById("creative-workspace-label");
  const creativeEmptyState = document.getElementById("creative-empty-state");
  const drawingWorkspace = document.getElementById("drawing-workspace");
  const writingWorkspace = document.getElementById("writing-workspace");
  const craftWorkspace = document.getElementById("craft-workspace");
  const challengeWorkspace = document.getElementById("challenge-workspace");
  const closeCreativeWorkspaceButton = document.getElementById("creative-close-workspace");
  const creativeActivityMeta = document.getElementById("creative-activity-meta");
  const creativeActivityLibrary = Array.isArray(sharedSiteData.creativeActivityLibrary)
    ? sharedSiteData.creativeActivityLibrary
    : [];
  const CREATIVE_ACTIVITY_HISTORY_KEY = "youngExplorerCreativeActivityHistory";
  const CREATIVE_ACTIVITY_ASSIGNMENTS_KEY = "youngExplorerCreativeActivityAssignments";
  const activityCategories = {
    drawing: ["Drawing", "Creative Challenges", "Design", "Invention", "Science Creativity", "Technology Creativity", "Nature Creativity", "Problem Solving"],
    writing: ["Writing", "Storytelling", "Creative Challenges", "Design", "Invention", "Science Creativity", "Technology Creativity", "Nature Creativity", "Problem Solving"],
    craft: ["Crafts", "Drawing", "Creative Challenges", "Design", "Invention", "Science Creativity", "Technology Creativity", "Nature Creativity", "Problem Solving"],
    challenge: ["Drawing", "Writing", "Crafts", "Creative Challenges", "Design", "Invention", "Storytelling", "Science Creativity", "Technology Creativity", "Nature Creativity", "Problem Solving"]
  };
  const activeCreativeActivities = {};

  const openCreativeWorkspace = (activityKey) => {
    if (!activityKey || !creativeActivities[activityKey]) return;

    const activity = creativeActivities[activityKey];
if (!activity) return;

const activityChoices =
  typeof getCreativeActivityChoices === "function"
    ? getCreativeActivityChoices(activityKey)
    : [];

const featuredActivity = activityChoices[0];

    if (creativeDetailPanel && creativeDetailTitle && creativeDetailText) {
      creativeDetailTitle.textContent = featuredActivity?.title || activity.title;
      creativeDetailText.textContent = featuredActivity?.text || activity.detailText;
      creativeDetailPanel.hidden = false;
    }

    if (!creativeWorkspace) {
      recordCreativeActivity(activityKey);
      return;
    }

    creativeWorkspace.hidden = false;
    creativeWorkspaceTitle.textContent = featuredActivity?.title || activity.title;
    creativeWorkspaceLabel.textContent = featuredActivity ? `${activity.label} • ${featuredActivity.category}` : activity.label;
    if (creativeActivityMeta) {
      creativeActivityMeta.hidden = !featuredActivity;
      creativeActivityMeta.textContent = featuredActivity
        ? `${featuredActivity.category} • ${featuredActivity.difficulty} • ${featuredActivity.level} • ${featuredActivity.source}`
        : "";
    }
    hideCreativePanels();

    if (creativeEmptyState) creativeEmptyState.classList.add("hidden");

    if (activityKey === "drawing") {
      if (drawingWorkspace) drawingWorkspace.classList.remove("hidden");
      renderDrawingPrompts();
    }

    if (activityKey === "writing") {
      if (writingWorkspace) writingWorkspace.classList.remove("hidden");
      renderWritingPrompts();
      restoreWritingDraft();
    }

    if (activityKey === "craft") {
      if (craftWorkspace) craftWorkspace.classList.remove("hidden");
      renderCraftIdeas();
    }

    if (activityKey === "challenge") {
      if (challengeWorkspace) challengeWorkspace.classList.remove("hidden");
      renderChallengeIdeas();
    }

    creativeWorkspace.scrollIntoView({ behavior: "smooth", block: "nearest" });
    recordCreativeActivity(activityKey);
  };

  if (creativeButtons.length > 0) {
    creativeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const activity = button.dataset.activity;
        openCreativeWorkspace(activity);
      });
    });
  }

  if (closeCreativeWorkspaceButton) {
    closeCreativeWorkspaceButton.addEventListener("click", () => {
      if (creativeWorkspace) creativeWorkspace.hidden = true;
      if (creativeDetailPanel) creativeDetailPanel.hidden = false;
    });
  }

  if (currentPage === "creative" || currentPage === "home") {

    const getCreativeLevel = (grade = "", age = "") => {
      const normalizedGrade = String(grade).trim();
      if (["Grade 1", "Grade 2", "Grade 3"].includes(normalizedGrade)) return "Early Primary";
      if (["Grade 4", "Grade 5", "Grade 6"].includes(normalizedGrade)) return "Upper Primary";
      if (["7th Grade", "8th Grade", "9th Grade", "JSS1", "JSS2", "JSS3"].includes(normalizedGrade)) return "Middle School";
      if (["10th Grade", "11th Grade", "12th Grade", "SS1", "SS2", "SS3"].includes(normalizedGrade)) return "Senior";
      const numericAge = Number(age);
      if (Number.isFinite(numericAge) && numericAge > 0) {
        if (numericAge <= 7) return "Early Primary";
        if (numericAge <= 10) return "Upper Primary";
        if (numericAge <= 14) return "Middle School";
        return "Senior";
      }
      return "General";
    };

    const getCreativeStorage = (key, fallback) => {
      try {
        const saved = JSON.parse(localStorage.getItem(key) || "");
        return saved && typeof saved === "object" ? saved : fallback;
      } catch (error) {
        return fallback;
      }
    };

    const getToday = () => new Date().toISOString().slice(0, 10);
    const getStableIndex = (value, length) => {
      let hash = 0;
      for (let index = 0; index < value.length; index += 1) hash = ((hash * 31) + value.charCodeAt(index)) >>> 0;
      return length ? hash % length : 0;
    };

    const selectCreativeActivity = (activityKey) => {
      const profile = getSavedProfile();
      const level = getCreativeLevel(profile.grade, profile.age);
      const categories = activityCategories[activityKey] || [];
      const categoryPool = creativeActivityLibrary.filter((activity) => categories.includes(activity.category));
      const levelPool = categoryPool.filter((activity) => activity.level === level);
      const candidates = levelPool.length ? levelPool : categoryPool;
      if (!candidates.length) return null;

      const date = getToday();
      const assignmentKey = `${date}|${profile.grade || "general"}|${activityKey}`;
      const assignments = getCreativeStorage(CREATIVE_ACTIVITY_ASSIGNMENTS_KEY, {});
      const assigned = candidates.find((activity) => activity.id === assignments[assignmentKey]?.id);
      if (assigned) return assigned;

      const history = getCreativeStorage(CREATIVE_ACTIVITY_HISTORY_KEY, []);
      const recentIds = new Set(Array.isArray(history) ? history.slice(-8).map((entry) => entry.id) : []);
      const freshCandidates = candidates.filter((activity) => !recentIds.has(activity.id));
      const selectionPool = freshCandidates.length ? freshCandidates : candidates;
      const activity = selectionPool[getStableIndex(assignmentKey, selectionPool.length)];
      assignments[assignmentKey] = { id: activity.id, date };
      const earliestDate = new Date();
      earliestDate.setDate(earliestDate.getDate() - 45);
      const earliestKey = earliestDate.toISOString().slice(0, 10);
      Object.keys(assignments).forEach((key) => {
        if (assignments[key]?.date && assignments[key].date < earliestKey) delete assignments[key];
      });
      localStorage.setItem(CREATIVE_ACTIVITY_ASSIGNMENTS_KEY, JSON.stringify(assignments));
      const updatedHistory = [...(Array.isArray(history) ? history : []), { id: activity.id, date }].slice(-16);
      localStorage.setItem(CREATIVE_ACTIVITY_HISTORY_KEY, JSON.stringify(updatedHistory));
      return activity;
    };

    const getCreativeActivityChoices = (activityKey) => {
      const featured = selectCreativeActivity(activityKey);
      const profile = getSavedProfile();
      const level = getCreativeLevel(profile.grade, profile.age);
      const categories = activityCategories[activityKey] || [];
      const matchingActivities = creativeActivityLibrary.filter((activity) => activity.level === level && categories.includes(activity.category));
      return featured ? [featured, ...matchingActivities.filter((activity) => activity.id !== featured.id)] : matchingActivities;
    };

    const creativePanels = [drawingWorkspace, writingWorkspace, craftWorkspace, challengeWorkspace];

    const hideCreativePanels = () => {
      creativePanels.forEach((panel) => {
        if (panel) panel.classList.add("hidden");
      });
      if (creativeEmptyState) creativeEmptyState.classList.add("hidden");
    };

    const renderDrawingPrompts = () => {
      const promptList = document.getElementById("drawing-prompts");
      if (!promptList) return;
      promptList.innerHTML = "";
      (activeCreativeActivities.drawing || getCreativeActivityChoices("drawing")).forEach((activity) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "prompt-chip";
        button.textContent = activity.title;
        button.addEventListener("click", () => {
          const canvas = document.getElementById("drawing-canvas");
          if (!canvas) return;
          const context = canvas.getContext("2d");
          context.fillStyle = "rgba(255,255,255,0.8)";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = "#172033";
          context.font = "30px Nunito";
          context.fillText(activity.text, 24, 54);
        });
        promptList.appendChild(button);
      });
    };

    const renderWritingPrompts = () => {
      const promptList = document.getElementById("writing-prompts");
      const textarea = document.getElementById("writing-story-input");
      if (!promptList || !textarea) return;
      promptList.innerHTML = "";
      (activeCreativeActivities.writing || getCreativeActivityChoices("writing")).forEach((activity) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "prompt-chip";
        button.textContent = activity.title;
        button.addEventListener("click", () => {
          if (!textarea.value.trim()) {
            textarea.value = activity.text;
          } else {
            textarea.value = `${textarea.value.trim()}\n\n${activity.text}`;
          }
          updateWritingStats();
        });
        promptList.appendChild(button);
      });
    };

    const updateWritingStats = () => {
      const textarea = document.getElementById("writing-story-input");
      const wordCountEl = document.getElementById("word-count");
      const characterCountEl = document.getElementById("character-count");
      const saveStatusEl = document.getElementById("writing-save-status");
      if (!textarea || !wordCountEl || !characterCountEl || !saveStatusEl) return;

      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      wordCountEl.textContent = `${words} words`;
      characterCountEl.textContent = `${textarea.value.length} characters`;
      saveStatusEl.textContent = "Draft ready to save";
    };

    const saveWritingDraft = () => {
      const textarea = document.getElementById("writing-story-input");
      const saveStatusEl = document.getElementById("writing-save-status");
      if (!textarea || !saveStatusEl) return;

      localStorage.setItem("youngExplorerWritingDraft", textarea.value);
      saveStatusEl.textContent = "Draft saved";
      triggerCelebrationBurst("Your story is saved!");
    };

    const restoreWritingDraft = () => {
      const textarea = document.getElementById("writing-story-input");
      if (!textarea) return;

      const savedDraft = localStorage.getItem("youngExplorerWritingDraft") || "";
      textarea.value = savedDraft;
      updateWritingStats();
    };

    const renderCraftIdeas = () => {
      const craftList = document.getElementById("craft-list");
      if (!craftList) return;
      craftList.innerHTML = "";
      const featuredActivity = activeCreativeActivities.craft?.[0];
      const featuredCraft = featuredActivity ? {
        id: `library-${featuredActivity.id}`,
        title: featuredActivity.title,
        description: featuredActivity.text,
        difficulty: featuredActivity.difficulty,
        time: featuredActivity.difficulty === "Advanced" ? "35 minutes" : featuredActivity.difficulty === "Medium" ? "25 minutes" : "15 minutes",
        materials: ["Paper", "Pencils or markers", "Safe recycled materials"],
        safety: "Use child-safe tools and ask an adult for help with cutting or joining materials.",
        steps: [featuredActivity.text, "Sketch or plan your idea before making it.", "Create a first version using the materials you chose.", "Label what you made and explain how it connects to what you are learning."],
        source: featuredActivity.source
      } : null;
      const craftsToShow = featuredCraft ? [featuredCraft, ...craftIdeaCollection] : craftIdeaCollection;

      craftsToShow.forEach((craft) => {
        const card = document.createElement("article");
        card.className = "craft-idea-card";
        card.innerHTML = `
          <div class="craft-card-top">
            <span class="craft-difficulty">${craft.difficulty}</span>
            <span class="craft-time">${craft.time}</span>
          </div>
          <h4>${craft.title}</h4>
          <p>${craft.description}</p>
          <div class="craft-meta">
            <strong>Materials:</strong>
            <span>${craft.materials.join(", ")}</span>
          </div>
          <button type="button" class="btn btn-small btn-primary craft-start-btn" data-craft-id="${craft.id}">Start Craft</button>
        `;
        craftList.appendChild(card);
      });

      craftList.querySelectorAll(".craft-start-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const selectedCraft = craftsToShow.find((craft) => craft.id === button.dataset.craftId);
          if (!selectedCraft) return;

          const stepPanel = document.getElementById("craft-step-panel");
          const title = document.getElementById("craft-step-title");
          const badge = document.getElementById("craft-step-badge");
          const time = document.getElementById("craft-step-time");
          const materials = document.getElementById("craft-step-materials");
          const text = document.getElementById("craft-step-instruction");
          const nextBtn = document.getElementById("craft-next-btn");
          if (!stepPanel || !title || !badge || !time || !materials || !text || !nextBtn) return;

          let craftStepIndex = 0;
          const updateStep = () => {
            title.textContent = selectedCraft.title;
            badge.textContent = selectedCraft.difficulty;
            time.textContent = selectedCraft.time;
            materials.textContent = selectedCraft.materials.join(", ");
            text.textContent = selectedCraft.steps[craftStepIndex];
            document.getElementById("craft-prev-btn").disabled = craftStepIndex === 0;
            nextBtn.textContent = craftStepIndex === selectedCraft.steps.length - 1 ? "Finished!" : "Next Step";
          };

          updateStep();
          stepPanel.classList.remove("hidden");
          document.getElementById("craft-prev-btn").onclick = () => {
            craftStepIndex = Math.max(0, craftStepIndex - 1);
            updateStep();
          };
          nextBtn.onclick = () => {
            if (craftStepIndex < selectedCraft.steps.length - 1) {
              craftStepIndex += 1;
              updateStep();
              return;
            }
            triggerCelebrationBurst("Craft complete! Great work!");
            recordCreativeActivity("craft");
          };
        });
      });
    };

    const renderChallengeIdeas = () => {
      const challengeGrid = document.getElementById("challenge-idea-grid");
      if (!challengeGrid) return;
      challengeGrid.innerHTML = "";
      const featuredActivity = activeCreativeActivities.challenge?.[0];
      const featuredChallenge = featuredActivity ? {
        id: `library-${featuredActivity.id}`,
        title: featuredActivity.title,
        description: featuredActivity.text,
        time: featuredActivity.difficulty === "Advanced" ? "30–40 minutes" : featuredActivity.difficulty === "Medium" ? "20–30 minutes" : "10–15 minutes",
        instructions: `${featuredActivity.category} • ${featuredActivity.difficulty} • ${featuredActivity.level}`,
        workspace: `${featuredActivity.text} Inspiration: ${featuredActivity.source}.`
      } : null;
      const challengesToShow = featuredChallenge ? [featuredChallenge, ...challengeIdeaCollection] : challengeIdeaCollection;

      challengesToShow.forEach((challenge) => {
        const card = document.createElement("article");
        card.className = "challenge-idea-card";
        card.innerHTML = `
          <div class="challenge-idea-head">
            <span class="challenge-idea-badge">${challenge.time}</span>
          </div>
          <h4>${challenge.title}</h4>
          <p>${challenge.description}</p>
          <div class="challenge-idea-instructions">
            <strong>Prompt:</strong>
            <span>${challenge.instructions}</span>
          </div>
          <button type="button" class="btn btn-small btn-primary challenge-start-btn" data-challenge-id="${challenge.id}">Open Challenge</button>
        `;
        challengeGrid.appendChild(card);
      });

      challengeGrid.querySelectorAll(".challenge-start-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const selectedChallenge = challengesToShow.find((challenge) => challenge.id === button.dataset.challengeId);
          if (!selectedChallenge) return;

          triggerCelebrationBurst("Challenge time! Let your imagination fly!");
          const challengeDetail = document.createElement("div");
          challengeDetail.className = "challenge-idea-detail";
          challengeDetail.innerHTML = `
            <h4>${selectedChallenge.title}</h4>
            <p>${selectedChallenge.description}</p>
            <div class="challenge-idea-box">
              <strong>Your mission:</strong>
              <span>${selectedChallenge.workspace}</span>
            </div>
            <p class="challenge-idea-tip">${selectedChallenge.instructions}</p>
          `;

          const grid = document.getElementById("challenge-idea-grid");
          if (grid) {
            grid.innerHTML = "";
            grid.appendChild(challengeDetail);
          }
          recordCreativeActivity("challenge");
        });
      });
    };

    const openCreativeWorkspace = (activityKey) => {
      if (!creativeWorkspace) return;

      const activity = creativeActivities[activityKey];
      if (!activity || !creativeDetailPanel || !creativeDetailTitle || !creativeDetailText) return;
      const activityChoices = getCreativeActivityChoices(activityKey);
      const featuredActivity = activityChoices[0];
      activeCreativeActivities[activityKey] = activityChoices;

      creativeDetailTitle.textContent = featuredActivity?.title || activity.title;
      creativeDetailText.textContent = featuredActivity?.text || activity.detailText;
      creativeDetailPanel.hidden = false;
      creativeWorkspace.hidden = false;
      creativeWorkspaceTitle.textContent = featuredActivity?.title || activity.title;
      creativeWorkspaceLabel.textContent = featuredActivity ? `${activity.label} • ${featuredActivity.category}` : activity.label;
      if (creativeActivityMeta) {
        creativeActivityMeta.hidden = !featuredActivity;
        creativeActivityMeta.textContent = featuredActivity
          ? `${featuredActivity.category} • ${featuredActivity.difficulty} • ${featuredActivity.level} • ${featuredActivity.source}`
          : "";
      }
      hideCreativePanels();

      if (creativeEmptyState) creativeEmptyState.classList.add("hidden");

      if (activityKey === "drawing") {
        if (drawingWorkspace) drawingWorkspace.classList.remove("hidden");
        renderDrawingPrompts();
      }

      if (activityKey === "writing") {
        if (writingWorkspace) writingWorkspace.classList.remove("hidden");
        renderWritingPrompts();
        restoreWritingDraft();
      }

      if (activityKey === "craft") {
        if (craftWorkspace) craftWorkspace.classList.remove("hidden");
        renderCraftIdeas();
      }

      if (activityKey === "challenge") {
        if (challengeWorkspace) challengeWorkspace.classList.remove("hidden");
        renderChallengeIdeas();
      }

      creativeWorkspace.scrollIntoView({ behavior: "smooth", block: "nearest" });
      recordCreativeActivity(activityKey);
    };

    creativeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const activity = button.dataset.activity;
        openCreativeWorkspace(activity);
      });
    });

    if (closeCreativeWorkspaceButton) {
      closeCreativeWorkspaceButton.addEventListener("click", () => {
        if (creativeWorkspace) creativeWorkspace.hidden = true;
        if (creativeDetailPanel) creativeDetailPanel.hidden = false;
      });
    }

    const canvas = document.getElementById("drawing-canvas");
    const brushSizeInput = document.getElementById("brush-size");
    const colorButtons = document.querySelectorAll(".color-swatch");
    const drawPencilButton = document.getElementById("draw-pencil-tool");
    const drawEraserButton = document.getElementById("draw-eraser-tool");
    const drawUndoButton = document.getElementById("draw-undo-btn");
    const drawRedoButton = document.getElementById("draw-redo-btn");
    const drawClearButton = document.getElementById("draw-clear-btn");
    const drawSaveButton = document.getElementById("draw-save-btn");

    if (canvas && brushSizeInput) {
      const context = canvas.getContext("2d");
      let painting = false;
      let isErasing = false;
      let brushColor = "#172033";
      let brushSize = Number(brushSizeInput.value);
      let drawingHistory = [];
      let redoStack = [];

      const saveCanvasState = () => {
        drawingHistory.push(canvas.toDataURL());
        if (drawingHistory.length > 20) drawingHistory.shift();
        redoStack = [];
      };

      const restoreCanvasState = (imageData) => {
        const image = new Image();
        image.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0);
        };
        image.src = imageData;
      };

      const resizeCanvas = () => {
        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const scaledWidth = Math.max(320, Math.floor(rect.width));
        const scaledHeight = Math.max(240, Math.floor(rect.height || 360));
        const snapshot = canvas.toDataURL();
        canvas.width = scaledWidth * ratio;
        canvas.height = scaledHeight * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, scaledWidth, scaledHeight);
        if (snapshot && snapshot !== "data:," ) {
          const image = new Image();
          image.onload = () => {
            context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
          };
          image.src = snapshot;
        }
      };

      const getCanvasCoordinates = (event) => {
  const bounds = canvas.getBoundingClientRect();

  const scaleX = canvas.width / bounds.width;
  const scaleY = canvas.height / bounds.height;

  return {
    x: (event.clientX - bounds.left) * scaleX,
    y: (event.clientY - bounds.top) * scaleY
  };
};

const beginPaint = (event) => {
  const { x, y } = getCanvasCoordinates(event);

  painting = true;
  context.beginPath();
  context.moveTo(x, y);
  context.lineWidth = brushSize;
  context.strokeStyle = isErasing ? "#ffffff" : brushColor;
  context.lineTo(x, y);
  context.stroke();
};

const continuePaint = (event) => {
  if (!painting) return;

  const { x, y } = getCanvasCoordinates(event);

  context.lineWidth = brushSize;
  context.strokeStyle = isErasing ? "#ffffff" : brushColor;
  context.lineTo(x, y);
  context.stroke();
};

      const stopPaint = () => {
        if (!painting) return;
        painting = false;
        saveCanvasState();
      };

      canvas.addEventListener("pointerdown", (event) => {
        canvas.setPointerCapture(event.pointerId);
        beginPaint(event);
      });
      canvas.addEventListener("pointermove", continuePaint);
      canvas.addEventListener("pointerup", stopPaint);
      canvas.addEventListener("pointerleave", stopPaint);
      canvas.addEventListener("pointercancel", stopPaint);

      brushSizeInput.addEventListener("input", (event) => {
        brushSize = Number(event.target.value);
      });

      colorButtons.forEach((button) => {
        button.addEventListener("click", () => {
          colorButtons.forEach((swatch) => swatch.classList.remove("active"));
          button.classList.add("active");
          brushColor = button.dataset.color || "#172033";
          isErasing = false;
        });
      });

      if (drawPencilButton) {
        drawPencilButton.addEventListener("click", () => {
          isErasing = false;
        });
      }

      if (drawEraserButton) {
        drawEraserButton.addEventListener("click", () => {
          isErasing = true;
        });
      }

      if (drawUndoButton) {
        drawUndoButton.addEventListener("click", () => {
          if (drawingHistory.length <= 1) return;
          redoStack.push(drawingHistory.pop());
          restoreCanvasState(drawingHistory[drawingHistory.length - 1]);
        });
      }

      if (drawRedoButton) {
        drawRedoButton.addEventListener("click", () => {
          if (redoStack.length === 0) return;
          drawingHistory.push(redoStack.pop());
          restoreCanvasState(drawingHistory[drawingHistory.length - 1]);
        });
      }

      if (drawClearButton) {
        drawClearButton.addEventListener("click", () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          saveCanvasState();
        });
      }

      if (drawSaveButton) {
        drawSaveButton.addEventListener("click", () => {
          const dataUrl = canvas.toDataURL("image/png");
          localStorage.setItem("youngExplorerDrawing", dataUrl);
          triggerCelebrationBurst("Your drawing is saved!");
        });
      }

      const savedDrawing = localStorage.getItem("youngExplorerDrawing");
      if (savedDrawing) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          saveCanvasState();
        };
        image.src = savedDrawing;
      } else {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
    }

    const writingInput = document.getElementById("writing-story-input");
    const writingSaveButton = document.getElementById("writing-save-btn");
    const writingClearButton = document.getElementById("writing-clear-btn");

    if (writingInput) {
      writingInput.addEventListener("input", updateWritingStats);
    }

    if (writingSaveButton) {
      writingSaveButton.addEventListener("click", saveWritingDraft);
    }

    if (writingClearButton) {
      writingClearButton.addEventListener("click", () => {
        if (writingInput) {
          writingInput.value = "";
          updateWritingStats();
          localStorage.removeItem("youngExplorerWritingDraft");
          document.getElementById("writing-save-status").textContent = "Draft cleared";
        }
      });
    }

    restoreWritingDraft();
  }

  const decodeApiValue = (value) => {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  };

  const normalizeQuestion = (question) => decodeApiValue(question)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const shuffle = (items) => {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
    }

    return shuffledItems;
  };

  const showQuizLoading = () => {
    isLoadingQuestion = true;
    currentQuestion = null;
    answered = false;
    quizQuestionEl.textContent = "Loading a fresh question...";
    quizProgressEl.textContent = `Preparing question ${currentQuestionIndex + 1} of ${totalQuestionsInQuiz}...`;
    quizFeedbackEl.textContent = "Finding an educational question for you...";
    quizFeedbackEl.classList.remove("success", "error");
    quizFeedbackEl.setAttribute("aria-busy", "true");
    quizOptionsEl.innerHTML = "";
    nextBtn.hidden = true;
    playAgainBtn.disabled = true;
  };

  const showQuizError = (message) => {
    isLoadingQuestion = false;
    currentQuestion = null;
    answered = false;
    quizQuestionEl.textContent = "We need another try.";
    quizProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestionsInQuiz}`;
    quizFeedbackEl.textContent = message;
    quizFeedbackEl.classList.remove("success");
    quizFeedbackEl.classList.add("error");
    quizFeedbackEl.setAttribute("aria-busy", "false");
    quizOptionsEl.innerHTML = "";
    nextBtn.textContent = "Try Again";
    nextBtn.hidden = false;
    playAgainBtn.disabled = false;
  };

  const renderQuestion = () => {
    if (!currentQuestion || !quizQuestionEl || !quizOptionsEl || !quizFeedbackEl || !scoreValueEl || !quizProgressEl) {
      return;
    }

    answered = false;
    quizQuestionEl.textContent = currentQuestion.question;
    quizProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestionsInQuiz}`;
    scoreValueEl.textContent = String(score);
    quizFeedbackEl.textContent = "Choose an answer to see if you are correct.";
    quizFeedbackEl.classList.remove("success", "error");
    quizFeedbackEl.setAttribute("aria-busy", "false");
    nextBtn.hidden = true;
    playAgainBtn.disabled = false;

    quizOptionsEl.innerHTML = "";
    replayAnimation(quizQuestionEl, "content-reveal");
    replayAnimation(quizOptionsEl, "content-reveal");

    currentQuestion.options.forEach((option, optionIndex) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = "quiz-option";
      optionButton.textContent = option;
      optionButton.dataset.index = String(optionIndex);
      optionButton.addEventListener("click", () => handleAnswer(optionIndex));
      quizOptionsEl.appendChild(optionButton);
    });
  };

  const loadQuestion = () => {
    if (!quizQuestionEl || !quizOptionsEl || !quizFeedbackEl || !scoreValueEl || !quizProgressEl) return;
    if (!activeQuizQuestions.length || currentQuestionIndex >= activeQuizQuestions.length) {
      showFinalScore();
      return;
    }

    showQuizLoading();
    currentQuestion = activeQuizQuestions[currentQuestionIndex];
    isLoadingQuestion = false;
    renderQuestion();
  };

  const handleAnswer = (selectedIndex) => {
    if (!currentQuestion || isLoadingQuestion || answered) return;

    const optionButtons = Array.from(quizOptionsEl.querySelectorAll(".quiz-option"));
    const correctIndex = currentQuestion.correctIndex ?? currentQuestion.answer;

    answered = true;
    questionsAnsweredThisQuiz += 1;
    nextBtn.hidden = false;

    optionButtons.forEach((button) => {
      const choiceIndex = Number(button.dataset.index);
      button.disabled = true;

      if (choiceIndex === correctIndex) {
        button.classList.add("correct");
      }

      if (choiceIndex === selectedIndex && choiceIndex !== correctIndex) {
        button.classList.add("incorrect");
      }
    });

    if (selectedIndex === correctIndex) {
      score += 1;
      scoreValueEl.textContent = String(score);
      quizFeedbackEl.textContent = "Correct! Great job!";
      quizFeedbackEl.classList.add("success");
    } else {
      quizFeedbackEl.textContent = `Not quite. The correct answer is: ${currentQuestion.options[correctIndex]}.`;
      quizFeedbackEl.classList.add("error");
    }

    nextBtn.textContent = currentQuestionIndex === totalQuestionsInQuiz - 1 ? "See Final Score" : "Next Question";
  };

  const buildQuizCompletionMarkup = (timeExpired = false) => {
    const answeredCount = Math.min(questionsAnsweredThisQuiz, totalQuestionsInQuiz);
    const wrongAnswers = Math.max(0, answeredCount - score);
    const accuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;
    const pointsEarned = QUIZ_POINTS;

    return `
      <div class="quiz-completion-card" aria-live="polite">
        <div class="celebration-sparkles" aria-hidden="true">
          <span>🎉</span>
          <span>✨</span>
          <span>⭐</span>
        </div>
        <h3>${timeExpired ? "Time's Up!" : "Congratulations!"}</h3>
        <p class="quiz-completion-subtitle">${timeExpired ? "The timer has ended." : "You completed the quiz!"}</p>
        <div class="quiz-result-grid">
          <div class="quiz-result-stat">
            <span>Total questions</span>
            <strong>${totalQuestionsInQuiz}</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Answered</span>
            <strong>${answeredCount}</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Correct</span>
            <strong>${score}</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Incorrect</span>
            <strong>${wrongAnswers}</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Score</span>
            <strong>${score} / ${totalQuestionsInQuiz}</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Accuracy</span>
            <strong>${accuracy}%</strong>
          </div>
          <div class="quiz-result-stat">
            <span>Points earned</span>
            <strong>+${pointsEarned} ⭐</strong>
          </div>
        </div>
        <p class="quiz-completion-message">${timeExpired ? "Great effort! Take a breath and try another round!" : "Great job! Keep exploring and learning!"}</p>
      </div>
    `;
  };

  const setupQuizCompletionActions = () => {
    if (!quizCompletionActionsEl) return;

    quizCompletionActionsEl.innerHTML = "";
    quizCompletionActionsEl.hidden = false;

    const tryAgainButton = document.createElement("button");
    tryAgainButton.type = "button";
    tryAgainButton.className = "btn btn-primary";
    tryAgainButton.textContent = "Try Again";
    tryAgainButton.addEventListener("click", () => {
      clearQuizTimer();
      selectedQuestionCount = 5;
      currentQuestionIndex = 0;
      score = 0;
      answered = false;
      questionsAnsweredThisQuiz = 0;
      quizCompletedThisSession = false;
      hideQuizCompletionActions();
      nextBtn.hidden = true;
      nextBtn.textContent = "Next Question";
      buildQuizSelectionPanel();
    });

    const continueButton = document.createElement("button");
    continueButton.type = "button";
    continueButton.className = "btn btn-primary";
    continueButton.textContent = "Continue Exploring";
    continueButton.addEventListener("click", () => {
      window.location.href = "explore.html";
    });

    const achievementsButton = document.createElement("button");
    achievementsButton.type = "button";
    achievementsButton.className = "btn btn-secondary";
    achievementsButton.textContent = "View Achievements";
    achievementsButton.addEventListener("click", () => {
      window.location.href = "achievements.html";
    });

    quizCompletionActionsEl.append(tryAgainButton, continueButton, achievementsButton);
  };

  const hideQuizCompletionActions = () => {
    if (!quizCompletionActionsEl) return;
    quizCompletionActionsEl.innerHTML = "";
    quizCompletionActionsEl.hidden = true;
  };

  const showFinalScore = ({ timeExpired = false } = {}) => {
    if (quizCompletedThisSession) return;

    quizCompletedThisSession = true;
    clearQuizTimer();
    const pointsEarned = QUIZ_POINTS;
    progress.totalPoints += pointsEarned;
    progress.completedQuizzes += 1;
    saveAndRefreshProgress();

    quizQuestionEl.textContent = timeExpired ? "Time's Up!" : "Quiz Complete!";
    quizProgressEl.textContent = `Final Score: ${score} / ${totalQuestionsInQuiz}`;
    quizOptionsEl.innerHTML = buildQuizCompletionMarkup(timeExpired);
    nextBtn.hidden = true;
    playAgainBtn.hidden = false;
    playAgainBtn.textContent = "Try Again";
    setupQuizCompletionActions();

    quizFeedbackEl.textContent = timeExpired
      ? `⏰ Time is up! You answered ${Math.min(questionsAnsweredThisQuiz, totalQuestionsInQuiz)} out of ${totalQuestionsInQuiz}. You earned +${pointsEarned} points.`
      : `You completed the quiz successfully! You earned +${pointsEarned} points.`;
    quizFeedbackEl.classList.remove("error");
    quizFeedbackEl.classList.add("success");
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (isLoadingQuestion) return;

      if (!currentQuestion) {
        loadQuestion();
        return;
      }

      if (!answered) return;

      if (currentQuestionIndex === totalQuestionsInQuiz - 1) {
        showFinalScore();
        return;
      }

      currentQuestionIndex += 1;
      loadQuestion();
    });
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      if (isLoadingQuestion) return;

      clearQuizTimer();
      selectedQuestionCount = 5;
      currentQuestionIndex = 0;
      score = 0;
      answered = false;
      questionsAnsweredThisQuiz = 0;
      quizCompletedThisSession = false;
      hideQuizCompletionActions();
      playAgainBtn.textContent = "Try Again";
      if (nextBtn) {
        nextBtn.hidden = true;
        nextBtn.textContent = "Next Question";
      }
      buildQuizSelectionPanel();
    });
  }

  buildQuizSelectionPanel();

  const updateActiveLink = () => {
    const pageTargets = {
      home: ["index.html", "#home"],
      explore: ["explore.html"],
      creative: ["creative.html"],
      games: ["games.html"],
      challenges: ["challenges.html"],
      achievements: ["achievements.html"]
    };

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href") || "";
      const isActive = pageTargets[currentPage]?.includes(linkTarget) || (currentPage === "home" && (linkTarget === "index.html" || linkTarget === "#home"));
      link.classList.toggle("active", isActive);
    });
  };

  updateActiveLink();
  if (sections.length > 0) {
    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navMenu && navToggle) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
});
