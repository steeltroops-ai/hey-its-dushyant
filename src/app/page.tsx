import Image from "next/image";
import Link from "next/link";
import MemoryCard from "@/components/memory-card";
import TributeSection from "@/components/tribute-section";
import EnhancedHero from "@/components/enhanced-hero";
import EnhancedNavbar from "@/components/enhanced-navbar";
import EnhancedTimeline from "@/components/enhanced-timeline";
import AnimatedSection from "@/components/animated-section";
import InstagramLiveFeed from "@/components/instagram-live-feed";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      {/* Enhanced Navigation */}
      <EnhancedNavbar />

      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* About Section */}
      <AnimatedSection id="about" className="py-20 bg-background section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="inline-block relative">
              Who He Was
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            A glimpse into the beautiful soul that touched so many lives
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="right"
              delay={0.2}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                Dushyant was a creative soul who loved videography, editing,
                visiting temples and spiritual sites. He was particularly fond
                of exploring every temple in the Mathura-Vrindavan area.
              </p>
              <p className="text-lg leading-relaxed">
                Though introverted by nature, he opened up deeply with those he
                trusted. He was kind, soft-spoken, and a deep thinker - a
                beautiful but often misunderstood human.
              </p>
              <p className="text-lg leading-relaxed">
                His passion for music, his thoughtful nature, and his genuine
                care for his close friends made him someone truly special in our
                lives.
              </p>

              {/* Photo Gallery Button in the middle of His Story */}
              <div className="my-8 flex justify-center">
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 shadow-md text-center max-w-sm">
                  <h3 className="text-lg font-medium mb-2">See More Photos</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Explore our photo gallery
                  </p>
                  <Link
                    href="/photos"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Photo Gallery</span>
                  </Link>
                </div>
              </div>

              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium">
                  "To know him was to love him"
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection
              direction="left"
              delay={0.4}
              className="relative h-[450px] rounded-lg overflow-hidden shadow-xl"
            >
              {/* Replace with actual image of Dushyant */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-300 flex items-center justify-center">
                <div className="relative">
                  <p className="text-neutral-500 font-medium">
                    Photo of Dushyant
                  </p>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline Section */}
      <AnimatedSection
        id="timeline"
        className="py-20 bg-muted/50 section-muted"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="inline-block relative">
              Life Journey
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            The path Dushyant walked and the moments that shaped his life
          </p>

          <EnhancedTimeline
            events={[
              {
                title: "Early Life",
                subtitle: "Childhood memories and formative years",
                description:
                  "Details about Dushyant's early life, family, and childhood. The foundation that shaped his unique perspective on the world.",
                date: "1998-2010",
              },
              {
                title: "Creative Pursuits",
                subtitle: "Discovering passions",
                description:
                  "How Dushyant developed his love for videography, editing, and music. His natural talent for capturing beauty through his lens.",
                date: "2010-2015",
              },
              {
                title: "Spiritual Journey",
                subtitle: "Exploring temples and spirituality",
                description:
                  "His connection to temples in Mathura-Vrindavan and spiritual growth. The peace he found in these sacred spaces.",
                date: "2015-2020",
              },
              {
                title: "Friendships",
                subtitle: "Meaningful connections",
                description:
                  "The deep bonds he formed with his close friends and the impact he had. How he touched lives with his kindness and wisdom.",
                date: "Throughout his life",
              },
              {
                title: "Legacy",
                subtitle: "Remembered in our hearts",
                description:
                  "Though he is no longer with us physically, his spirit lives on in the memories we share and the lives he touched.",
                date: "Forever",
              },
            ]}
          />
        </div>
      </AnimatedSection>

      {/* Instagram & Work Section */}
      <AnimatedSection
        id="instagram"
        className="py-20 bg-muted/30 section-muted"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="underline inline-block relative">
              His Instagram & Creative Work
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Explore Dushyant's photography, videography, and creative projects
            shared on Instagram. From temple visits to behind-the-scenes
            content, see the world through his lens.
          </p>

          <AnimatedSection delay={0.2} direction="up">
            <InstagramLiveFeed />
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Memory Wall Section */}
      <AnimatedSection
        id="memories"
        className="py-20 bg-background section-light"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="inline-block relative">
              Memory Wall
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Cherished moments and shared experiences that keep his spirit alive
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample memories - replace with actual memories */}
            <AnimatedSection delay={0.1} direction="up">
              <MemoryCard
                id={1}
                title="Temple Visit in Vrindavan"
                location="Vrindavan"
                date="January 15, 2023"
                description="We spent the day exploring temples in Vrindavan. Dushyant knew so much about each temple's history and significance. His eyes would light up when explaining the stories behind each deity and architectural detail."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="up">
              <MemoryCard
                id={2}
                title="Music Session"
                location="College Campus"
                date="November 10, 2022"
                description="An impromptu music session where Dushyant shared some of his favorite songs. He had such a unique taste in music, always finding obscure artists that somehow perfectly matched the mood."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.3} direction="up">
              <MemoryCard
                id={3}
                title="Video Project"
                location="Mathura"
                date="March 5, 2023"
                description="Working on a video project together in Mathura. Dushyant had an incredible eye for detail and composition. He could transform ordinary scenes into something magical through his lens."
              />
            </AnimatedSection>

            {/* Photo Gallery Button in the middle of Memories */}
            <AnimatedSection
              delay={0.35}
              direction="up"
              className="md:col-span-2 lg:col-span-3"
            >
              <div className="flex justify-center">
                <div className="bg-muted/30 p-6 rounded-lg border border-border/50 shadow-md text-center max-w-md">
                  <h3 className="text-xl font-medium mb-3">
                    Explore More Memories
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Visit our photo gallery to see more cherished moments
                  </p>
                  <Link
                    href="/photos"
                    className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>View Photo Gallery</span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} direction="up">
              <MemoryCard
                id={4}
                title="Late Night Conversations"
                location="Hostel Rooftop"
                date="December 20, 2022"
                description="Those deep conversations on the hostel rooftop that would go on until sunrise. Dushyant had such profound insights about life, spirituality, and the universe. He made everyone think differently about the world."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <MemoryCard
                id={5}
                title="Birthday Celebration"
                location="Local Café"
                date="October 8, 2022"
                description="Celebrating Dushyant's birthday at his favorite café. He was so humble and almost embarrassed by the attention, but his smile that day was unforgettable."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.6} direction="up">
              <MemoryCard
                id={6}
                title="Spiritual Discussion"
                location="Yamuna Riverbank"
                date="February 12, 2023"
                description="Sitting by the Yamuna river discussing philosophy and spirituality. Dushyant had a way of explaining complex spiritual concepts that made them accessible and meaningful to everyone."
              />
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Tribute Wall Section */}
      <AnimatedSection id="tribute" className="py-20 bg-muted/50 section-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="inline-block relative">
              Leave a Tribute
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Share your memories and thoughts to honor Dushyant's legacy
          </p>

          <AnimatedSection delay={0.2} direction="up">
            <TributeSection />
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 w-16 h-1 bg-primary/30 rounded-full"></div>

            <h3 className="text-xl font-medium mb-4">
              In Loving Memory of Dushyant
            </h3>

            <p className="text-center max-w-md mb-8 text-muted-foreground">
              This memorial website was created with love by Mayank to honor and
              preserve the memory of his dear brother.
            </p>

            <div className="flex space-x-6 mb-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/photos"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Photos
              </Link>
              <Link
                href="#tribute"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Tribute
              </Link>
            </div>

            <div className="text-sm text-muted-foreground/70">
              <p>&copy; {new Date().getFullYear()} - Forever in our hearts</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
