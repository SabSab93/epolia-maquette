export const STUDENT_REGISTRATION_TOTAL_STEPS = 11

export function getStudentRegistrationProgress(currentStep) {
  const safeStep = Math.min(Math.max(Number(currentStep) || 1, 1), STUDENT_REGISTRATION_TOTAL_STEPS)
  return {
    currentStep: safeStep,
    totalSteps: STUDENT_REGISTRATION_TOTAL_STEPS,
    progressPercent: (safeStep / STUDENT_REGISTRATION_TOTAL_STEPS) * 100,
    progressLabel: `${safeStep}/${STUDENT_REGISTRATION_TOTAL_STEPS}`
  }
}
