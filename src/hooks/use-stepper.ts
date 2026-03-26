import { onboardingSteps, onboardingStepsRoutes, siteRoutes } from "@/constant/steps";
import { useRouter } from "next/navigation";

const useStepper = () => {
  const router = useRouter();

  const navigate = (route: keyof typeof onboardingSteps, replace = false) => {
    const url = onboardingStepsRoutes[onboardingSteps[route]]?.route;
    if (url) {
      if (replace) router.replace(url);
      else router.push(url);
    }
  };

  const navigateByRoute = (route: keyof typeof siteRoutes, replace = false) => {
    if (replace) router.replace(siteRoutes[route]);
    else router.push(siteRoutes[route]);
  };

  return { navigate, navigateByRoute };
};

export default useStepper;
