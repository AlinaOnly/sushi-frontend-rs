import i18n from 'i18next';

// err login
export function WRONG_PASS() {
    return i18n.t('errors.incorrect_email_or_password');
}
export function WRONG_TOKEN() {
    return i18n.t('errors.error_during_login');
}

// err user registration
export function CONFLICT_REG() {
    return i18n.t('errors.user_already_exists');
}
export function ERR_REGISTER() {
    return i18n.t('errors.error_during_registration');
}
export function ERR_CHANGE_INFO() {
    return i18n.t('errors.error_during_data_change');
}
export function EMAIL() {
    return i18n.t('errors.enter_valid_email');
}
export function PASS() {
    return i18n.t('errors.enter_password_of_min_8_chars');
}
export function NAME() {
    return i18n.t('errors.enter_text_of_min_two_letters');
}
export function PHONE() {
    return i18n.t('errors.enter_valid_phone_starting_with_plus');
}

// err update profile
export function ERR_UPDATE() {
    return i18n.t('errors.error_during_profile_update');
}

