export interface Project {
    _id: string;
    applicants: string[];
    author: string;
    covers: string[];
    description: Translations;
    moderation_status: string;
    objective: Translations;
    created_by: string;
    links: string;
    reason_of_reject: string;
    rejected_applicants: string[];
    request: string;
    slug: string;
    successful_applicants: string[];
    tags: string[];
    title: Translations;
    views: number;
    who_is_needed: Translations;
    how_to_help_the_project: string;
    phase: string;
}


export interface StatisticItem {
    _id: string;
    value: string;
    title: string;
    source: string;
    category: string;
}

export interface Translations {
    en: string;
    hy: string;
    ru: string;
}

export interface Research {
    _id: string;
    link: string;
    title: string;
    source: string;
}

export interface Event {
    _id: string;
    author: string;
    cover: string;
    date: string;
    description: Translations;
    location: string;
    moderation_status: number;
    reason_of_reject: string;
    slug: string;
    tags: string[];
    terms_of_visit: Translations;
    title: Translations;
    links: string;
    orgs: string;
}

export interface User {
    _id: string;
    email: string;
    banned: boolean;
    password: string;
    avatar: string;
    first_name: string;
    last_name: string;
    //   full_name: FullName;
    description: string;
    contacts: any;
    location: string;
    role: string;
    job: string;
    language: string;
    tags?: string[];
    contacts_request: ContactsRequest;
    user_projects: UserProjects;
}

export interface FullName {
    en: string;
    ru: string;
    hy: string;
}


export interface ContactsRequest {
    incoming_contact_requests: any;
    outgoing_contact_requests: any;
    confirmed_contacts_requests: any;
    blocked_users: any;
}

export interface IncomingContactRequests { }

export type OutgoingContactRequests = Record<string, string>;

export interface ConfirmedContactsRequests { }

export interface BlockedUsers { }

export interface UserProjects {
    projects_applications: Record<string, boolean>[];
    confirmed_applications: ConfirmedApplications;
    rejected_applicants: RejectedApplicants;
    created_projects: Record<string, boolean>[];
}

export interface ProjectsApplications { }

export interface ConfirmedApplications { }

export interface RejectedApplicants { }

export interface CreatedProjects { }

//LOCATION

export interface LocationSuggests {
    suggestions: LocationSuggests[];
}

export interface LocationSuggests {
    value: string;
    unrestricted_value: string;
    data: LocationSuggestsData;
}

export interface LocationSuggestsData {
    postal_code?: string;
    country: string;
    country_iso_code: string;
    federal_district: string;
    region_fias_id: string;
    region_kladr_id: string;
    region_iso_code: string;
    region_with_type: string;
    region_type: string;
    region_type_full: string;
    region: string;
    area_fias_id?: string;
    area_kladr_id?: string;
    area_with_type?: string;
    area_type?: string;
    area_type_full?: string;
    area?: string;
    city_fias_id?: string;
    city_kladr_id?: string;
    city_with_type?: string;
    city_type?: string;
    city_type_full?: string;
    city?: string;
    city_area: any;
    city_district_fias_id: any;
    city_district_kladr_id: any;
    city_district_with_type: any;
    city_district_type: any;
    city_district_type_full: any;
    city_district: any;
    settlement_fias_id?: string;
    settlement_kladr_id?: string;
    settlement_with_type?: string;
    settlement_type?: string;
    settlement_type_full?: string;
    settlement?: string;
    street_fias_id: any;
    street_kladr_id: any;
    street_with_type?: string;
    street_type?: string;
    street_type_full?: string;
    street?: string;
    stead_fias_id: any;
    stead_cadnum: any;
    stead_type: any;
    stead_type_full: any;
    stead: any;
    house_fias_id: any;
    house_kladr_id: any;
    house_cadnum: any;
    house_type: any;
    house_type_full: any;
    house: any;
    block_type: any;
    block_type_full: any;
    block: any;
    entrance: any;
    floor: any;
    flat_fias_id: any;
    flat_cadnum: any;
    flat_type: any;
    flat_type_full: any;
    flat: any;
    flat_area: any;
    square_meter_price: any;
    flat_price: any;
    room_fias_id: any;
    room_cadnum: any;
    room_type: any;
    room_type_full: any;
    room: any;
    postal_box: any;
    fias_id: string;
    fias_code: any;
    fias_level: string;
    fias_actuality_state: string;
    kladr_id: string;
    geoname_id?: string;
    capital_marker: string;
    okato: string;
    oktmo: string;
    tax_office: string;
    tax_office_legal: string;
    timezone: any;
    geo_lat: string;
    geo_lon: string;
    beltway_hit: any;
    beltway_distance: any;
    metro: any;
    divisions: any;
    qc_geo: string;
    qc_complete: any;
    qc_house: any;
    history_values: any;
    unparsed_parts: any;
    source: any;
    qc: any;
}
///

export type BackendLocation = {
    _id: string;
    value: string;
    country: string;
    region: string;
    city: string;
    settlement: string;
    street: string;
    house: string;
    extra_info: string;
};

export interface Notification {
    _id: string;
    status: string;
    type: string;
    body: any; // в зависимости от type будет разный body
}
