import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfessionalField from "./components/Content/ProfessionalField";
import HowFeeling from "./components/Content/HowFeeling";
import WhereStart from "./components/Content/WhereStart";
import Comment from "./components/Content/Comment";
import Footer from "./components/Footer";
import Container from "./components/Container";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container>
        <Hero />
        <ProfessionalField />
        <WhereStart />
        <HowFeeling />
        <Comment />
      </Container>
      <Footer />
    </div>
  );
}
