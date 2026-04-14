from __future__ import annotations

DEFAULT_SETTINGS = {
    "siteName": "Lanart21 Creative Studio",
    "logoUrl": "/Image/lanart.jpg",
    "contactEmail": "hello@lanart21.com",
    "contactPhone": "",
    "footerTagline": "Visual storytelling at its best.",
}

DEFAULT_HOME = {
    "hero": {
        "eyebrow": "Books & Comics",
        "title": "Stories that move. Books that last.",
        "subtitle": "Graphic novels, comics, and illustrated books—we bring your stories to life.",
        "ctaPrimary": "Explore books",
        "ctaSecondary": "About us",
        "ctaPrimaryTo": "/books",
        "bgImageUrl": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920&q=85",
    },
    "aboutTeaser": {
        "eyebrow": "Who we are",
        "title": "About Us",
        "body": "We specialize in illustration, comics, animation, and creative direction—turning your ideas into clear, powerful visual narratives for brands, organizations, and creators.",
        "ctaText": "Learn more",
        "imageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=85",
    },
    "servicesTeaser": {
        "eyebrow": "What we create",
        "title": "Our Services",
        "body": "From comics and graphic novels to illustration and animation—we bring your vision to life.",
        "ctaText": "View our services",
        "serviceTitles": [
            "Illustration & Visual Art",
            "Comic & Graphic Novels",
            "Animation & Motion",
            "Branding & Identity",
        ],
    },
    "booksTeaser": {
        "title": "Books & Publications",
        "body": "Comics & graphic novels, illustrated books, and original visual storytelling projects.",
        "ctaText": "View all books",
    },
    "portfolioTeaser": {
        "eyebrow": "Our Work",
        "title": "Portfolio",
        "body": "A selection of our comics, illustration, animation, and branding projects.",
        "ctaText": "View portfolio",
    },
}

DEFAULT_ABOUT = {
    "hero": {
        "eyebrow": "Who We Are",
        "title": "About Lanart21",
        "subtitle": "A visual storytelling studio turning ideas into clear, powerful narratives through illustration, comics, animation, and creative direction.",
    },
    "story": {
        "label": "Our Story",
        "heading": "Visual storytelling at the heart of everything we do",
        "paragraph1": "Lanart21 Creative Studio is a visual storytelling studio specializing in illustration, comics, animation, and creative direction. We work with brands, organizations, and creators to turn ideas into clear, powerful visual narratives.",
        "paragraph2": "Whether it's a comic book, an animated explainer, a brand identity, or custom illustrations, we combine craft with strategy so your message reaches the right people and leaves a lasting impression.",
        "ctaText": "Explore our services",
        "storyImageUrl": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900&q=85",
    },
    "values": [
        {
            "title": "Story First",
            "description": "Every project starts with the narrative. We craft visuals that serve the story and connect with audiences.",
            "image": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80",
        },
        {
            "title": "Creative Excellence",
            "description": "From concept to final deliverable, we aim for quality that stands out and stands the test of time.",
            "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
        },
    ],
    "teamSection": {
        "label": "Our Team",
        "heading": "Expert creatives who love what they do",
        "intro": "From founders to colorists and typographers, our team brings together diverse skills to deliver illustration, comics, animation, and branding that tell your story with clarity and impact.",
        "ctaText": "Meet the team below",
        "teamImageUrl": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85",
        "members": [
            {"name": "Lan Gabriel", "role": "Founder & Creative Director", "focus": "Branding, Animation & Motion", "imageUrl": ""},
            {"name": "Sauveur", "role": "Associate Creative Director & Lead Inker / Sketch Artist", "focus": "", "imageUrl": ""},
            {"name": "Jospine", "role": "Colorist", "focus": "", "imageUrl": ""},
            {"name": "Ciella", "role": "Typography Designer & Editor", "focus": "", "imageUrl": ""},
        ],
    },
}

DEFAULT_SERVICES = {
    "hero": {
        "eyebrow": "What We Do",
        "title": "Our Services",
        "subtitle": "Illustration & Visual Art, Comic & Graphic Novel Production, Animation & Motion Design, and Branding & Visual Identity.",
    },
    "sections": [
        {
            "id": "illustration",
            "title": "Illustration & Visual Art",
            "tag": "Visual Art",
            "description": "Custom illustrations that capture your brand and story.",
            "image": "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80",
        },
        {
            "id": "comics",
            "title": "Comic & Graphic Novel Production",
            "tag": "Comics",
            "description": "Full production from script to finished pages.",
            "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
        },
    ],
}

DEFAULT_PORTFOLIO = {
    "hero": {
        "eyebrow": "Our Work",
        "title": "Portfolio",
        "subtitle": "A selection of our illustration, comics, animation, and branding projects.",
    },
    "browseHeading": "Browse by category",
    "browseSubtitle": "From visual art to motion design—explore what we create for brands and creators.",
    "categories": [
        {
            "title": "Illustration & Visual Art",
            "count": "Selected works",
            "image": "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&q=80",
        },
        {
            "title": "Comics & Graphic Novels",
            "count": "Projects",
            "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80",
        },
    ],
}

DEFAULT_CONTACT = {
    "hero": {
        "eyebrow": "Get in Touch",
        "title": "Contact Us",
        "subtitle": "Ready to turn your ideas into visual narratives? Send us a message and we'll get back to you.",
    },
    "formHeading": "Send a message",
}

DEFAULT_SITE_SECTIONS = {
    "about": DEFAULT_ABOUT,
    "settings": DEFAULT_SETTINGS,
    "home": DEFAULT_HOME,
    "services": DEFAULT_SERVICES,
    "portfolio": DEFAULT_PORTFOLIO,
    "contact": DEFAULT_CONTACT,
}

SAMPLE_COMICS = [
    {
        "id": "1",
        "title": "Echoes of the Lost City",
        "description": "A young explorer discovers an ancient city beneath the desert and must unravel its secrets.",
        "author": "Lan Gabriel",
        "genre": "Adventure, Fantasy",
        "language": "English",
        "status": "ongoing",
        "coverImage": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80",
        "type": "series",
        "ageRating": "12+",
        "chapterOrEpisode": 24,
    },
    {
        "id": "2",
        "title": "One Day in Tokyo",
        "description": "A one-shot story about connection and coincidence.",
        "author": "Sauveur",
        "genre": "Slice of Life, Drama",
        "language": "English",
        "status": "completed",
        "coverImage": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
        "type": "one-shot",
        "ageRating": "16+",
    },
]

