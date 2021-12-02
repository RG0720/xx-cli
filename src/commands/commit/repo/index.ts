import { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { SimpleGit } from 'simple-git';

export interface RepoUserProps {
  login: string;
}

export interface Repo {
  token: string;
  client: AxiosInstance;
  getTokenHelpUrl: () => string;
  createRepo: (login: string) => Promise<unknown>;
  createOrgRepo: (name: string, login: string) => Promise<unknown>;
  getRepo: (login: string, name: string) => Promise<unknown>;
  getUser: () => Promise<RepoUserProps>;
  getOrg: () => Promise<RepoUserProps[]>;
  createReadme: (belongTo: string, repoName: string) => Promise<unknown>;
  getRemote: (login: string, name: string) => string;
  moveFiles: (from: string, to: string) => void;
  cloneToLocal: (git: SimpleGit, belongTo: string, repoName: string) => void;
  setToken: (token: string) => void;
  ensureRemoteRepo: (
    belongTo: string,
    repoName: string,
    ownerType: string,
  ) => void;
  get: <T, R>(
    url: string,
    headers: AxiosRequestHeaders,
    params?: T,
  ) => Promise<R>;
  post: <T, R>(
    url: string,
    data?: T,
    headers?: AxiosRequestHeaders,
  ) => Promise<R>;
}
