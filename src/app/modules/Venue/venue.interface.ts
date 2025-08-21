export type TMenu = {
    item_name: string;
    item_description: string;
    item_price: number;
};

export type TOpeningHours = {
    [day in "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"]: {
        isClosed: boolean;
        openTime: string;
        closeTime: string;
    };
};

export interface TVenue {
    serialId: string;
    name: string;
    venue_type: "cafe" | "bakery" | "restaurant";
    location: string;
    menu: TMenu[];
    isBlocked?: boolean;
    ratings?: number;
    popular_Item?: string;
    venue_image: string;
    opening_hours: TOpeningHours;
    isDeleted?: boolean;
    isFeatured?: boolean;
}
