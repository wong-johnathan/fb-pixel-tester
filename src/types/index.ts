export interface FbEventParameter {
  name: string;
  description?: string;
  type?: "string" | "number";
}

export interface FbEvent {
  name: string;
  description?: string;
  parameters?: FbEventParameter[];
}

export interface UserInfoField {
  parameter: string;
  label: string;
  type?: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image_link: string;
  [key: string]: string;
}

export interface MetaState {
  pixelId: string;
  testEventCode: string;
  accessToken: string;
  catalogLink: string;
  catalogContent: CatalogItem[];
}

export interface MetaContextType {
  state: MetaState;
  updateState: (newState: MetaState) => void;
}

export type UserInfo = Record<string, string | number>;

export interface SendPixelParams {
  isCustom?: boolean;
  dataParams: Record<string, unknown>;
  eventType: string;
  eventID: string;
  pixelId: string;
  userInfo: UserInfo;
}

export interface SendCAPIData {
  userInfo: Record<string, string[]>;
  dataParams: Record<string, unknown>;
  eventType: string;
}
