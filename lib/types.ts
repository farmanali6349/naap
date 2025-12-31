export type ImageDoc = {
  id: string;
  naapId: string;
  userId: string;
  cloudinaryId: string;
  url: string;
  createdAt: Date;
};

export type NaapDoc = {
  id: string;
  userId: string;
  customerName?: string;
  customerPhone: string;
  notes?: string;
  createdAt?: Date;
};

export type ImageUploadResponse = {
  success: boolean;
  message: string;
  images?: { id: string; url: string }[];
  error?: unknown;
};

export type APIResponse = {
  success: boolean;
  message: string;
};
