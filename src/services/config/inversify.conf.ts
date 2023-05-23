import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from './types';
import { GitHubRepository } from '../repositories/github.repository';
import { GitHubRepositoryService } from '../repositories/github.repository.service';

const repositoryContainer = new Container();

repositoryContainer.bind<GitHubRepository>(TYPES.GIT_HUB_REPOSITORY).to(GitHubRepositoryService);

export {repositoryContainer};
