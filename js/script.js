// Sample Data (Replace with API later)
const universitiesData = {
    "United Kingdom": [
        {
            name: "University of Oxford",
            location: "Oxford, UK",
            courses: {
                "Foundation": [
                    { name: "Foundation in Science", duration: "1 year", fees: "£25,000", requirements: "High school diploma" }
                ],
                "Bachelors": [
                    { name: "BSc Computer Science", duration: "3 years", fees: "£35,000/year", requirements: "A-levels or equivalent" }
                ]
            }
        }
    ],
    "United States": [
        {
            name: "Harvard University",
            location: "Cambridge, MA",
            courses: {
                "Foundation": [
                    { name: "Pre-College Program", duration: "7 weeks", fees: "$13,200", requirements: "High school student" }
                ],
                "Bachelors": [
                    { name: "BA Computer Science", duration: "4 years", fees: "$54,000/year", requirements: "High school diploma" }
                ]
            }
        }
    ]
};

// Countries List
const countries = [
    { name: "United Kingdom", icon: "fa-landmark" },
    { name: "United States", icon: "fa-flag-usa" },
    { name: "Canada", icon: "fa-leaf" },
    { name: "Australia", icon: "fa-globe" }
];

// DOM Elements
const countryGrid = document.getElementById("country-grid");
const universityList = document.getElementById("university-list");
const courseLevels = document.getElementById("course-levels");
const coursesContainer = document.getElementById("courses-container");
const universitySearch = document.getElementById("university-search");

// Current Selections
let currentCountry = null;
let currentUniversity = null;





// Load Countries
function loadCountries() {
    countryGrid.innerHTML = "";
    countries.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";
        card.innerHTML = `
            <i class="fas ${country.icon}"></i>
            <h4>${country.name}</h4>
        `;
        card.addEventListener("click", () => selectCountry(country.name));
        countryGrid.appendChild(card);
    });
}

// Select Country
function selectCountry(country) {
    currentCountry = country;
    document.getElementById("country-selection").classList.add("hidden");
    document.getElementById("university-selection").classList.remove("hidden");
    loadUniversities(country);
}

// Load Universities
function loadUniversities(country) {
    universityList.innerHTML = "";
    const universities = universitiesData[country] || [];
    universities.forEach(uni => {
        const item = document.createElement("div");
        item.className = "university-item";
        item.innerHTML = `
            <h4>${uni.name}</h4>
            <p>${uni.location}</p>
        `;
        item.addEventListener("click", () => selectUniversity(uni));
        universityList.appendChild(item);
    });
}

// Select University
function selectUniversity(university) {
    currentUniversity = university;
    document.getElementById("university-selection").classList.add("hidden");
    document.getElementById("course-level-selection").classList.remove("hidden");
    loadCourseLevels(university);
}

// Load Course Levels
function loadCourseLevels(university) {
    courseLevels.innerHTML = "";
    const levels = Object.keys(university.courses);
    levels.forEach(level => {
        const card = document.createElement("div");
        card.className = "course-level-card";
        card.innerHTML = `
            <i class="fas fa-book"></i>
            <h4>${level}</h4>
        `;
        card.addEventListener("click", () => selectCourseLevel(level));
        courseLevels.appendChild(card);
    });
}

// Select Course Level
function selectCourseLevel(level) {
    document.getElementById("course-level-selection").classList.add("hidden");
    document.getElementById("courses-display").classList.remove("hidden");
    loadCourses(level);
}

// Load Courses
function loadCourses(level) {
    coursesContainer.innerHTML = "";
    const courses = currentUniversity.courses[level] || [];
    courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
            <h4>${course.name}</h4>
            <p>Duration: ${course.duration}</p>
            <p>Fees: ${course.fees}</p>
            <p>Requirements: ${course.requirements}</p>
        `;
        coursesContainer.appendChild(card);
    });
}

// Back Button Functionality
function goBack(section) {
    if (section === "country") {
        document.getElementById("university-selection").classList.add("hidden");
        document.getElementById("country-selection").classList.remove("hidden");
    } else if (section === "university") {
        document.getElementById("course-level-selection").classList.add("hidden");
        document.getElementById("university-selection").classList.remove("hidden");
    } else if (section === "level") {
        document.getElementById("courses-display").classList.add("hidden");
        document.getElementById("course-level-selection").classList.remove("hidden");
    }
}


// Add this new function
function setupEventListeners() {
    // University search functionality
    universitySearch.addEventListener('input', () => {
        const searchTerm = universitySearch.value.toLowerCase();
        const items = document.querySelectorAll('.university-item');
        
        items.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            item.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    });
}






// Initialize App
function init() {
    loadCountries();
    setupEventListeners();
}


// Initialize App
document.addEventListener("DOMContentLoaded", init);
