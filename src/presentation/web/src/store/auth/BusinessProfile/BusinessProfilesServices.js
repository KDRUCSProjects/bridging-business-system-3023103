// Demo
const BusinessProfileService = {
  query: (profile) => ({
    url: '/auth/demo',
    method: 'POST',
    body: profile,
  }),
};

// export
export const BusinessProfile = {
  BusinessProfileService,
};
