import { useRepositoryIoc } from "../services/config/context";
import { TYPES } from "../services/config/types";
import { GitHubRepository } from "../services/repositories/github.repository";
import useAxiosInterceptor from "./use-axios-interceptor";

const useGiHubRepository = (): GitHubRepository => {
  useAxiosInterceptor()
  const { container } = useRepositoryIoc();

  return container.get(TYPES.GIT_HUB_REPOSITORY);
};

export default useGiHubRepository;
