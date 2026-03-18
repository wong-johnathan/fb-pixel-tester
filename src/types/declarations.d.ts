declare module "react-facebook-pixel" {
  interface AdvancedMatching {
    em?: string;
    fn?: string;
    ln?: string;
    ph?: string;
    external_id?: string;
    [key: string]: string | undefined;
  }

  interface Options {
    debug?: boolean;
    autoConfig?: boolean;
  }

  const ReactPixel: {
    init: (pixelId: string, advancedMatching?: AdvancedMatching, options?: Options) => void;
    fbq: (type: string, eventName: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  };

  export default ReactPixel;
}

interface OpenGoogleTranslatorResult {
  translation: string;
}

interface OpenGoogleTranslator {
  TranslateLanguageData: (params: {
    listOfWordsToTranslate: string[];
    fromLanguage: string;
    toLanguage: string;
  }) => Promise<OpenGoogleTranslatorResult[]>;
  supportedLanguages: () => Record<string, string>;
}

interface Window {
  openGoogleTranslator: OpenGoogleTranslator;
}
