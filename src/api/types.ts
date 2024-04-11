export type APIResponse<T> =
  | {
      loading: false;
      error: null;
      data: null;
    }
  | {
      loading: true;
      error: null;
      data: null;
    }
  | {
      loading: false;
      error: null;
      data: T;
    }
  | {
      loading: false;
      error: string;
      data: null;
    };
