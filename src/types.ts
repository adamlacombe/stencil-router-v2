import { FunctionalComponent } from '@stencil/core';

export type RoutePath =
  | string
  | RegExp
  | ((path: string) => { [params: string]: string } | boolean | undefined | null);

export type RouterState = Readonly<InternalRouterState>;

export type OnChangeHandler<T extends keyof InternalRouterState> = (newValue: InternalRouterState[T], oldValue: InternalRouterState[T]) => void;

  export interface Router {
  readonly Switch: FunctionalComponent<{}>;
  readonly url: URL;
  readonly activePath: string;
  dispose(): void;
  onChange(key: 'url', cb: OnChangeHandler<'url'>);
  onChange(key: 'activePath', cb: OnChangeHandler<'activePath'>);
  push(href: string): void;
}

export interface RouterProps {
  router: Router;
}

export type RouteProps = RenderProps | RedirectProps;

export interface RenderProps {
  path: RoutePath;
  id?: string;
  render?: (params: { [param: string]: string }) => any;
}

export interface RedirectProps {
  path: RoutePath;
  to: string | ((source: string) => string);
}

export interface RouteEntry {
  path: RoutePath;
  jsx?: any;
  to?: string | ((source: string) => string);
  id?: string;
}

export interface InternalRouterState {
  url: URL;
  activePath: string;
}

export interface RouterOptions {
  parseURL?: (url: URL) => string;
  serializeURL?: (path: string) => URL;
}
