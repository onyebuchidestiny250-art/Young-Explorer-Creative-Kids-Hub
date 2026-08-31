document.addEventListener("DOMContentLoaded", () => {
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
  const quizzesCompletedEl = document.getElementById("quizzes-completed");
  const challengesCompletedEl = document.getElementById("challenges-completed");
  const activitiesCompletedEl = document.getElementById("activities-completed");
  const factIconEl = document.getElementById("fact-icon");
  const factCategoryEl = document.getElementById("fact-category");
  const factTextEl = document.getElementById("fact-text");
  const anotherFactButton = document.getElementById("another-fact-btn");
  const factCardEl = document.querySelector(".fact-card");
  const siteSearchInput = document.getElementById("site-search");
  const searchResultsEl = document.getElementById("search-results");

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

  const topicSearchConfig = {
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
  let topicSearchTimer = null;
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
    const searches = getRecentSearches(topic).filter((item) => item.toLowerCase() !== query.toLowerCase());
    searches.unshift(query);
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

  const topicMatchesCategory = (page, topic) => {
    const config = topicSearchConfig[topic];
    if (!config) return false;

    const categoryMetadata = (page.categories || [])
      .map((category) => category.title || "")
      .join(" ")
      .toLowerCase();
    const descriptiveMetadata = `${page.title || ""} ${page.description || ""}`.toLowerCase();
    const extractMetadata = (page.extract || "").toLowerCase();
    const matches = (text) => config.signals.filter((signal) => text.includes(signal));
    const categoryMatches = matches(categoryMetadata);
    const descriptionMatches = matches(descriptiveMetadata);
    const extractMatches = [...new Set(matches(extractMetadata))];

    return categoryMatches.length > 0
      || descriptionMatches.length > 0
      || extractMatches.length >= 2;
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

  const renderTopicResult = (result, query) => {
    topicResultMeta.textContent = `${topicSearchConfig[selectedTopic].label} topic`;
    topicResultTitle.textContent = result.title;
    topicResultExplanation.textContent = result.explanation;
    topicResultLink.href = result.url;
    if (result.thumbnail) {
      topicResultThumbnail.src = result.thumbnail;
      topicResultThumbnail.alt = `Illustration for ${result.title}`;
      topicResultThumbnail.hidden = false;
    } else {
      topicResultThumbnail.hidden = true;
    }
    relatedTopicListEl.innerHTML = "";
    result.relatedTopics.forEach((relatedTopic) => {
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
    relatedTopicsEl.hidden = result.relatedTopics.length === 0;
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
      const result = await searchWikipedia(query, selectedTopic, requestId);
      if (requestId !== topicRequestId) return;
      renderTopicResult(result, query);
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

  const creativeIdeas = {
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

  const searchCatalog = [
    { title: "Science", category: "Explore", description: "Discover experiments, ideas, and how the world works.", target: "#explore" },
    { title: "Animals", category: "Explore", description: "Meet amazing creatures and learn about animal life.", target: "#explore" },
    { title: "Space", category: "Explore", description: "Explore planets, stars, moons, and galaxies.", target: "#explore" },
    { title: "Nature", category: "Explore", description: "Learn about forests, oceans, weather, and our planet.", target: "#explore" },
    { title: "History", category: "Explore", description: "Journey into stories, inventions, and events from the past.", target: "#explore" },
    { title: "Geography", category: "Explore", description: "Explore countries, landmarks, maps, and places around the world.", target: "#explore" },
    { title: "Drawing Ideas", category: "Creative Corner", description: "Sketch magical gardens, friendly robots, and space adventures.", target: "#creative-corner" },
    { title: "Writing Activities", category: "Creative Corner", description: "Write mini stories about explorers and time-traveling animals.", target: "#creative-corner" },
    { title: "Craft Ideas", category: "Creative Corner", description: "Create paper planets, animal masks, and recycled art.", target: "#creative-corner" },
    { title: "Creative Challenges", category: "Creative Corner", description: "Build an invention or design a superhero with a special talent.", target: "#creative-corner" },
    { title: "Games & Quizzes", category: "Games & Quizzes", description: "Play educational quizzes and test what you know.", target: "#games" },
    { title: "Challenges", category: "Challenges", description: "Complete daily quests and missions to earn points.", target: "#challenges" },
    { title: "Fun Facts", category: "Fun Facts", description: "Learn short and surprising facts about the world.", target: "#fun-facts" }
  ];

  const renderSearchResults = (query) => {
    if (!searchResultsEl) return;

    const normalizedQuery = query.trim().toLowerCase();
    searchResultsEl.innerHTML = "";

    if (!normalizedQuery) {
      searchResultsEl.hidden = true;
      return;
    }

    const matchingResults = searchCatalog.filter((item) => {
      const searchableText = `${item.title} ${item.category} ${item.description}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    searchResultsEl.hidden = false;

    if (matchingResults.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "search-empty";
      emptyMessage.textContent = "No results found. Try another search!";
      searchResultsEl.appendChild(emptyMessage);
      return;
    }

    matchingResults.forEach((item) => {
      const result = document.createElement("article");
      result.className = "search-result";

      const resultContent = document.createElement("div");
      const category = document.createElement("p");
      category.className = "search-result-category";
      category.textContent = item.category;
      const title = document.createElement("h3");
      title.textContent = item.title;
      const description = document.createElement("p");
      description.textContent = item.description;
      resultContent.append(category, title, description);

      const openLink = document.createElement("a");
      openLink.className = "text-link";
      openLink.href = item.target;
      openLink.textContent = "Open section";

      result.append(resultContent, openLink);
      searchResultsEl.appendChild(result);
    });
  };

  if (siteSearchInput) {
    siteSearchInput.addEventListener("input", () => {
      renderSearchResults(siteSearchInput.value);
    });
  }

  const funFacts = [
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

  let currentFactIndex = 1;

  const replayAnimation = (element, className) => {
    if (!element) return;

    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  };

  const renderFact = (factIndex) => {
    const fact = funFacts[factIndex];

    if (!fact || !factIconEl || !factCategoryEl || !factTextEl) return;

    currentFactIndex = factIndex;
    factIconEl.textContent = fact.icon;
    factCategoryEl.textContent = fact.category;
    factTextEl.textContent = fact.text;
    replayAnimation(factCardEl, "content-reveal");
  };

  const showAnotherFact = () => {
    let nextFactIndex = currentFactIndex;

    while (nextFactIndex === currentFactIndex) {
      nextFactIndex = Math.floor(Math.random() * funFacts.length);
    }

    renderFact(nextFactIndex);
  };

  if (anotherFactButton) {
    anotherFactButton.addEventListener("click", showAnotherFact);
  }

  renderFact(currentFactIndex);

  const quizQuestionEl = document.getElementById("quiz-question");
  const quizOptionsEl = document.getElementById("quiz-options");
  const quizFeedbackEl = document.getElementById("quiz-feedback");
  const scoreValueEl = document.getElementById("score-value");
  const quizProgressEl = document.getElementById("quiz-progress");
  const nextBtn = document.getElementById("next-btn");
  const playAgainBtn = document.getElementById("play-again-btn");
  const totalPointsValueEl = document.getElementById("total-points-value");
  const challengeButtons = document.querySelectorAll(".challenge-complete-btn");

  const STORAGE_KEY = "youngExplorerProgress";
  const CHALLENGE_POINTS = 15;
  const QUIZ_POINTS = 10;
  const DISCOVERY_POINTS = 5;
  const ACTIVITY_POINTS = 10;
  const QUIZ_LENGTH = 5;
  const QUIZ_API_URL = "https://opentdb.com/api.php";
  const QUIZ_CATEGORY_IDS = [17, 27, 22, 23];

  const badgeDefinitions = [
    { icon: "🌟", name: "First Explorer", requirement: "25 points", isEarned: (savedProgress) => savedProgress.totalPoints >= 25 },
    { icon: "🧠", name: "Curious Mind", requirement: "50 points", isEarned: (savedProgress) => savedProgress.totalPoints >= 50 },
    { icon: "🌎", name: "Young Explorer", requirement: "100 points", isEarned: (savedProgress) => savedProgress.totalPoints >= 100 },
    { icon: "🏆", name: "Quiz Master", requirement: "150 points", isEarned: (savedProgress) => savedProgress.totalPoints >= 150 },
    { icon: "🎨", name: "Creative Kid", requirement: "Complete a creative activity", isEarned: (savedProgress) => savedProgress.completedActivities.length > 0 },
    { icon: "🔬", name: "Young Scientist", requirement: "Explore Science", isEarned: (savedProgress) => savedProgress.exploredTopics.includes("science") },
    { icon: "🚀", name: "Space Explorer", requirement: "Explore Space", isEarned: (savedProgress) => savedProgress.exploredTopics.includes("space") }
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
        quizQuestionHistory: Array.isArray(saved.quizQuestionHistory) ? saved.quizQuestionHistory : []
      };
    } catch (error) {
      return {
        totalPoints: 0,
        completedChallenges: [],
        completedActivities: [],
        exploredTopics: [],
        completedQuizzes: 0,
        quizQuestionHistory: []
      };
    }
  };

  const saveProgress = (progress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  };

  let progress = getSavedProgress();
  let unlockedBadgeNames = new Set();

  const syncTotalPointsDisplay = () => {
    if (totalPointsValueEl) {
      totalPointsValueEl.textContent = String(progress.totalPoints);
    }
  };

  const renderAchievements = () => {
    if (badgeListEl) {
      badgeListEl.innerHTML = badgeDefinitions.map((badge) => {
        const isUnlocked = badge.isEarned(progress);
        const isNewlyUnlocked = isUnlocked && !unlockedBadgeNames.has(badge.name);
        return `<li class="${isUnlocked ? "unlocked" : "locked"} ${isNewlyUnlocked ? "badge-new" : ""}">
          <span aria-hidden="true">${isUnlocked ? badge.icon : "🔒"}</span>
          <span>${badge.name}</span>
          <span class="badge-status">${isUnlocked ? "Earned" : badge.requirement}</span>
        </li>`;
      }).join("");
      unlockedBadgeNames = new Set(
        badgeDefinitions.filter((badge) => badge.isEarned(progress)).map((badge) => badge.name)
      );
    }

    if (quizzesCompletedEl) quizzesCompletedEl.textContent = String(progress.completedQuizzes);
    if (challengesCompletedEl) challengesCompletedEl.textContent = String(progress.completedChallenges.length);
    if (activitiesCompletedEl) activitiesCompletedEl.textContent = String(progress.completedActivities.length);
  };

  const saveAndRefreshProgress = () => {
    saveProgress(progress);
    syncTotalPointsDisplay();
    renderAchievements();
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
    challengeButtons.forEach((button) => {
      const challengeId = button.dataset.challengeId;
      const isCompleted = progress.completedChallenges.includes(challengeId);
      const card = button.closest(".challenge-card");

      button.disabled = isCompleted;
      button.textContent = isCompleted ? "Completed" : "Complete Challenge";
      button.classList.toggle("is-complete", isCompleted);

      if (card) {
        card.classList.toggle("completed", isCompleted);
      }
    });
  };

  const completeChallenge = (challengeId) => {
    if (!challengeId || progress.completedChallenges.includes(challengeId)) {
      return;
    }

    progress.completedChallenges.push(challengeId);
    progress.totalPoints += CHALLENGE_POINTS;
    saveAndRefreshProgress();
    updateChallengeButtons();
  };

  challengeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      completeChallenge(button.dataset.challengeId);
    });
  });

  syncTotalPointsDisplay();
  updateChallengeButtons();
  renderAchievements();

  let currentQuestionIndex = 0;
  let currentQuestion = null;
  let score = 0;
  let answered = false;
  let isLoadingQuestion = false;
  let quizCompletedThisSession = false;
  let categoryCursor = 0;

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

  if (exploreButton) {
    exploreButton.addEventListener("click", (event) => {
      const exploreSection = document.getElementById("explore");

      if (!exploreSection) return;

      event.preventDefault();
      exploreSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
    topicSearchInput.addEventListener("input", () => {
      clearTimeout(topicSearchTimer);
      if (!selectedTopic || topicSearchInput.value.trim().length < 3) return;

      topicSearchTimer = setTimeout(() => {
        handleTopicSearch();
      }, 600);
    });
  }

  creativeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const activity = button.dataset.activity;
      const activityInfo = creativeIdeas[activity];

      if (!activityInfo || !creativeDetailPanel || !creativeDetailTitle || !creativeDetailText) return;

      creativeDetailTitle.textContent = activityInfo.title;
      creativeDetailText.textContent = activityInfo.text;
      creativeDetailPanel.hidden = false;
      recordCreativeActivity(activity);

      creativeDetailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

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
    quizProgressEl.textContent = `Preparing question ${currentQuestionIndex + 1} of ${QUIZ_LENGTH}...`;
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
    quizProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${QUIZ_LENGTH}`;
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
    quizProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${QUIZ_LENGTH} · ${currentQuestion.category}`;
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

  const fetchUnusedQuestion = async () => {
    const usedQuestions = new Set(progress.quizQuestionHistory);
    const maxAttempts = 6;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const categoryId = QUIZ_CATEGORY_IDS[categoryCursor % QUIZ_CATEGORY_IDS.length];
      categoryCursor += 1;
      const requestUrl = `${QUIZ_API_URL}?amount=10&category=${categoryId}&type=multiple&encode=url3986`;
      const response = await fetch(requestUrl);

      if (response.status === 429) {
        throw new Error("The question service is busy. Please try again in a moment.");
      }

      if (!response.ok) {
        throw new Error("The question service is unavailable right now.");
      }

      const payload = await response.json();

      if (payload.response_code === 5) {
        throw new Error("The question service is busy. Please try again in a moment.");
      }

      if (payload.response_code !== 0 || !Array.isArray(payload.results)) {
        continue;
      }

      const unusedResult = payload.results.find((result) => {
        const questionKey = normalizeQuestion(result.question);
        return questionKey && !usedQuestions.has(questionKey);
      });

      if (unusedResult) {
        const question = decodeApiValue(unusedResult.question);
        const correctAnswer = decodeApiValue(unusedResult.correct_answer);
        const options = shuffle([
          ...unusedResult.incorrect_answers.map((answer) => ({ text: decodeApiValue(answer), correct: false })),
          { text: correctAnswer, correct: true }
        ]);

        return {
          category: decodeApiValue(unusedResult.category),
          question,
          options: options.map((option) => option.text),
          answer: options.findIndex((option) => option.correct),
          key: normalizeQuestion(question)
        };
      }
    }

    throw new Error("You have explored all the available questions in this category set.");
  };

  const loadQuestion = async () => {
    showQuizLoading();

    try {
      currentQuestion = await fetchUnusedQuestion();
      progress.quizQuestionHistory.push(currentQuestion.key);
      saveProgress(progress);
      isLoadingQuestion = false;
      renderQuestion();
    } catch (error) {
      const message = error instanceof TypeError
        ? "We could not connect to the question service. Please try again."
        : error.message || "We could not load a question. Please try again.";
      showQuizError(message);
    }
  };

  const handleAnswer = (selectedIndex) => {
    if (!currentQuestion || isLoadingQuestion || answered) return;

    const optionButtons = Array.from(quizOptionsEl.querySelectorAll(".quiz-option"));
    const correctIndex = currentQuestion.answer;

    answered = true;
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

    nextBtn.textContent = currentQuestionIndex === QUIZ_LENGTH - 1 ? "See Final Score" : "Next Question";
  };

  const showFinalScore = () => {
    if (quizCompletedThisSession) return;

    quizCompletedThisSession = true;
    progress.totalPoints += QUIZ_POINTS;
    progress.completedQuizzes += 1;
    saveAndRefreshProgress();

    quizQuestionEl.textContent = "Quiz Complete!";
    quizProgressEl.textContent = `Final Score: ${score} / ${QUIZ_LENGTH}`;
    quizOptionsEl.innerHTML = "";
    nextBtn.hidden = true;

    const resultBox = document.createElement("div");
    resultBox.className = "quiz-result-box";
    resultBox.innerHTML = `
      <p>You scored ${score} out of ${QUIZ_LENGTH}.</p>
      <p>Awesome work! You earned +${QUIZ_POINTS} points for finishing the quiz.</p>
    `;
    quizOptionsEl.appendChild(resultBox);

    quizFeedbackEl.textContent = "You completed the quiz successfully!";
    quizFeedbackEl.classList.remove("error");
    quizFeedbackEl.classList.add("success");
  };

  nextBtn.addEventListener("click", () => {
    if (isLoadingQuestion) return;

    if (!currentQuestion) {
      loadQuestion();
      return;
    }

    if (!answered) return;

    if (currentQuestionIndex === QUIZ_LENGTH - 1) {
      showFinalScore();
      return;
    }

    currentQuestionIndex += 1;
    loadQuestion();
  });

  playAgainBtn.addEventListener("click", () => {
    if (isLoadingQuestion) return;

    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    quizCompletedThisSession = false;
    nextBtn.hidden = true;
    nextBtn.textContent = "Next Question";
    loadQuestion();
  });

  loadQuestion();

  const updateActiveLink = () => {
    let currentSectionId = "home";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop <= 150 && sectionBottom >= 150) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href");
      const isActive = linkTarget === `#${currentSectionId}`;
      link.classList.toggle("active", isActive);
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navMenu && navToggle) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
});
