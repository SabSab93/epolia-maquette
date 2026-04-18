import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { EntryPage } from './pages/EntryPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterChoicePage } from './pages/RegisterChoicePage'
import { RegisterParticulierPage } from './pages/RegisterParticulierPage'
import { RegisterEtudiantPreviewPage } from './pages/RegisterEtudiantPreviewPage'
import { RegisterEtudiantFormationPage } from './pages/RegisterEtudiantFormationPage'
import { RegisterEtudiantFormationsPage } from './pages/RegisterEtudiantFormationsPage'
import { RegisterEtudiantPortfolioPage } from './pages/RegisterEtudiantPortfolioPage'
import { RegisterEtudiantPortfoliosPage } from './pages/RegisterEtudiantPortfoliosPage'
import { RegisterEtudiantPresentationPage } from './pages/RegisterEtudiantPresentationPage'
import { RegisterEtudiantCategoriesPage } from './pages/RegisterEtudiantCategoriesPage'
import { RegisterEtudiantSkillsPage } from './pages/RegisterEtudiantSkillsPage'
import { RegisterEtudiantQualitiesPage } from './pages/RegisterEtudiantQualitiesPage'
import { RegisterEtudiantLifePage } from './pages/RegisterEtudiantLifePage'
import { RegisterEtudiantAvailabilityPage } from './pages/RegisterEtudiantAvailabilityPage'
import { RegisterEtudiantRatePage } from './pages/RegisterEtudiantRatePage'
import { RegisterEtudiantAboutPage } from './pages/RegisterEtudiantAboutPage'
import { MessagesPage } from './pages/MessagesPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { ProfilePage } from './pages/ProfilePage'
import { StudentDashboardPage } from './pages/StudentDashboardPage'
import { StudentMissionsPage } from './pages/StudentMissionsPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { StudentProfileViewPage } from './pages/StudentProfileViewPage'
import { PaymentBookingPage } from './pages/PaymentBookingPage'
import { MessageReviewPage } from './pages/MessageReviewPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/fil-annonces" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-choice" element={<RegisterChoicePage />} />
        <Route path="/register-particulier" element={<RegisterParticulierPage />} />
        <Route path="/register-etudiant-preview" element={<RegisterEtudiantPreviewPage />} />
        <Route path="/register-etudiant-formation" element={<RegisterEtudiantFormationPage />} />
        <Route path="/register-etudiant-formations" element={<RegisterEtudiantFormationsPage />} />
        <Route path="/register-etudiant-portfolio" element={<RegisterEtudiantPortfolioPage />} />
        <Route path="/register-etudiant-portfolios" element={<RegisterEtudiantPortfoliosPage />} />
        <Route path="/register-etudiant-presentation" element={<RegisterEtudiantPresentationPage />} />
        <Route path="/register-etudiant-categories" element={<RegisterEtudiantCategoriesPage />} />
        <Route path="/register-etudiant-skills" element={<RegisterEtudiantSkillsPage />} />
        <Route path="/register-etudiant-qualities" element={<RegisterEtudiantQualitiesPage />} />
        <Route path="/register-etudiant-life" element={<RegisterEtudiantLifePage />} />
        <Route path="/register-etudiant-availability" element={<RegisterEtudiantAvailabilityPage />} />
        <Route path="/register-etudiant-rate" element={<RegisterEtudiantRatePage />} />
        <Route path="/register-etudiant-about" element={<RegisterEtudiantAboutPage />} />
        <Route path="/register-etudiant-qualities/*" element={<RegisterEtudiantQualitiesPage />} />
        <Route path="/register-etudiant-qualites" element={<RegisterEtudiantQualitiesPage />} />
        <Route path="/register-etudiant-quality" element={<RegisterEtudiantQualitiesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/paiement" element={<PaymentBookingPage />} />
        <Route path="/messages/avis" element={<MessageReviewPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/etudiant/:id" element={<StudentProfileViewPage />} />
        <Route path="/dashboard-etudiant" element={<StudentDashboardPage />} />
        <Route path="/missions-etudiant" element={<StudentMissionsPage />} />
        <Route path="/favoris" element={<FavoritesPage />} />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page introuvable"
              subtitle="La route demandée n'existe pas encore dans cette première maquette."
            />
          }
        />
      </Routes>
    </AuthProvider>
  )
}
