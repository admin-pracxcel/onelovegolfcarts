/**
 * /terms-and-conditions/ and /privacy-policy/: the live site's text, verbatim,
 * at the client's request (onelovegolfcartsbelize.com/terms-conditons/ and
 * /privacy-policy-2/). The Execution Manual's rewritten drafts (§13) are NOT
 * used. Only line breaks were repaired (one sentence split across two bullets
 * on the live terms page). Several terms conflict with other pages; see the
 * client questions checklist.
 */

export type LegalBlock = { p: string } | { ul: (string | { text: string; sub: string[] })[] };
export type LegalSection = { id: string; h2: string; blocks: LegalBlock[] };
export type LegalDoc = { meta: { title: string; description: string; h1: string }; intro: string[]; sections: LegalSection[]; outro?: string[] };

export const terms: LegalDoc = {
  meta: {
    title: 'Rental Terms & Conditions | One Love Golf Cart Rentals',
    description: 'Terms and conditions for renting a golf cart from One Love in San Pedro, Belize. Licence, payment, fuel, insurance and street rules.',
    h1: 'Terms & Conditions',
  },
  intro: ['Before booking your car please be sure to read our Terms & Conditions below!'],
  sections: [
    {
      id: 'rental',
      h2: 'Rental & Cancellation Policies',
      blocks: [
        {
          ul: [
            'Renter must possess a valid Driver’s License to hire a golf cart from us.',
            'Your driver’s license must be with you at all times while driving a golf cart.',
            'Reserve now & pay later',
            'An open credit card imprint is required on the pick-up date for security reasons and in the event of accidental damages or injuries.',
            'All carts are provided with gas and should be returned with the same amount. A 10% surcharge will be applied to carts returned without the right amount.',
          ],
        },
      ],
    },
    {
      id: 'insurance',
      h2: 'Insurance & Collision Policy',
      blocks: [
        {
          ul: [
            'Insurance is for third-party accidents only.',
            'If you crash into another golf cart, you will be required to incur all damage costs and the insurance company will pay for the other cart’s damages.',
            'If somebody crashes into you, they are liable for the damages, however, you are required by law to file a police report.',
          ],
        },
      ],
    },
    {
      id: 'street-rules',
      h2: 'Recommendations & Street Rules',
      blocks: [
        {
          ul: [
            'Do Not Drive under the influence of drugs or alcohol.',
            'No parking within 30 feet or less from street corners.',
            'No Parking areas on the street sides are marked by a red line.',
            'We recommend no more than the max limit allowed for golf carts to avoid damages to the golf cart or impound.',
            {
              text: 'There are 3 main streets in the center of San Pedro Town',
              sub: [
                'Barrier Reef Drive (front street): One Way Only (north). Parking only on the right side',
                'Pescador Drive (middle street): One Way Only (south). Parking only on the right side',
                'Angel Coral Street (back street): Two Way. Parking only on the east side',
              ],
            },
            'Taxi Parking zones are exclusive only for taxi cabs.',
            { text: 'Speed Limit', sub: ['10 miles per hour in residential areas.', '15 miles per hour in nonresidential areas.'] },
          ],
        },
      ],
    },
  ],
  outro: [
    'Thanks for understanding!',
    'Ensure yourself and others a safe and comfortable experience in San Pedro and help us in providing the high level of service we wish to offer to all our customers by following these rules.',
  ],
};

export const privacy: LegalDoc = {
  meta: {
    title: 'Privacy Policy | One Love Golf Cart Rentals',
    description: 'How One Love Golf Cart Rentals in San Pedro, Belize collects, uses and protects the information you share through our website.',
    h1: 'Privacy Policy',
  },
  intro: [
    'At One Love Golf Cart Rentals, accessible from https://onelovegolfcartsbelize.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information collected and recorded by One Love Golf Cart Rentals and how we use it.',
    'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.',
    'This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in One Love Golf Cart Rentals. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Privacy Policy Generator.',
  ],
  sections: [
    {
      id: 'use',
      h2: 'How we use your information',
      blocks: [
        { p: 'We use the information we collect in various ways, including to:' },
        {
          ul: [
            'Provide, operate, and maintain our website',
            'Improve, personalize, and expand our website',
            'Understand and analyze how you use our website',
            'Develop features and functionality',
            'Communicate with you, either directly via our booking form or contact form, including for customer service, to provide you with updates, and other information relating to the website',
            'Send you emails',
            'Find and prevent fraud',
          ],
        },
      ],
    },
    { id: 'consent', h2: 'Consent', blocks: [{ p: 'By using our website, you hereby consent to our Privacy Policy and agree to its terms.' }] },
    {
      id: 'collect',
      h2: 'Information we collect',
      blocks: [
        { p: 'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.' },
        { p: 'If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.' },
        { p: 'Our website is just for informational purposes, for bookings, and for our viewers to contact us via Contact Form. Both our booking form and contact form do not store information on our database.' },
        { p: 'The only other way information is collected is for analytics by our hosting provider and by Google Analytics.' },
      ],
    },
    {
      id: 'logs',
      h2: 'Log Files',
      blocks: [
        {
          p: 'One Love Golf Cart Rentals follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.',
        },
      ],
    },
    {
      id: 'cookies',
      h2: 'Cookies',
      blocks: [
        {
          p: 'Like any other website, One Love Golf Cart Rentals uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.',
        },
      ],
    },
    {
      id: 'third-party',
      h2: 'Third Party Privacy Policies',
      blocks: [
        { p: 'One Love Golf Cart Rentals’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.' },
        { p: 'You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.' },
      ],
    },
    {
      id: 'ccpa',
      h2: 'CCPA Privacy Rights (Do Not Sell My Personal Information)',
      blocks: [
        { p: 'Under the CCPA, among other rights, California consumers have the right to:' },
        {
          ul: [
            'Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.',
            'Request that a business deletes any personal data about the consumer that a business has collected.',
            'Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.',
          ],
        },
        { p: 'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.' },
      ],
    },
    {
      id: 'gdpr',
      h2: 'GDPR Data Protection Rights',
      blocks: [
        { p: 'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:' },
        {
          ul: [
            'The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.',
            'The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.',
            'The right to erasure – You have the right to request that we erase your personal data, under certain conditions.',
            'The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.',
            'The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.',
            'The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
          ],
        },
        { p: 'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.' },
      ],
    },
    {
      id: 'children',
      h2: 'Children’s Information',
      blocks: [
        { p: 'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.' },
        { p: 'One Love Golf Cart Rentals does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.' },
      ],
    },
    { id: 'comments', h2: 'Comments', blocks: [{ p: 'We do not use comments on our website. Comments are deactivated.' }] },
    {
      id: 'sharing',
      h2: 'Who we share your data with',
      blocks: [{ p: 'At One Love Golf Cart Rentals, data submitted from any of our forms is not shared with any third party. Data analytics is shared with their respective parties. Google Analytics with Google account.' }],
    },
  ],
};
