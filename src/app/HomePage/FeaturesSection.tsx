import React from "react";

type Feature = {
  icon: string;
  title: string;
  description: string;
  note?: string;
};

const features: Feature[] = [
  {
    icon: '<svg viewBox="-2.4 -2.4 28.80 28.80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>device_line</title> <g id="页面-1" stroke-width="0.00024000000000000003" fill="none" fill-rule="evenodd"> <g id="Device" transform="translate(-288.000000, 0.000000)" fill-rule="nonzero"> <g id="device_line" transform="translate(288.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M17,4 C18.0543909,4 18.9181678,4.81587733 18.9945144,5.85073759 L19,6 L19,8 L20,8 C21.0543909,8 21.9181678,8.81587733 21.9945144,9.85073759 L22,10 L22,19 C22,20.0543909 21.18415,20.9181678 20.1492661,20.9945144 L20,21 L16,21 C15.3166462,21 14.713387,20.657297 14.3526403,20.1343876 L14.2676,20 L4,20 C2.94563773,20 2.08183483,19.18415 2.00548573,18.1492661 L2,18 L2,6 C2,4.94563773 2.81587733,4.08183483 3.85073759,4.00548573 L4,4 L17,4 Z M20,10 L16,10 L16,19 L20,19 L20,10 Z M17,6 L4,6 L4,18 L14,18 L14,10 C14,8.89543 14.8954,8 16,8 L17,8 L17,6 Z"  fill="#ffffff"> </path> </g> </g> </g> </g></svg>',
    title: "On Any Device",
    description:
      "With Wave Synth, you can record and edit audio and collaborate with others on any device, no matter where you are.",
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 7.28595 2 4.92893 3.17157 3.46447C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.8284 20.5355C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#ffffff" stroke-width="1.5"></path> <path d="M15 17L15.8944 16.5528C16.572 16.214 17 15.5215 17 14.7639V10.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <rect x="6" y="8" width="8" height="8" rx="4" stroke="#ffffff" stroke-width="1.5"></rect> <path d="M15.5 9C15.5 8.17157 16.1716 7.5 17 7.5C17.8284 7.5 18.5 8.17157 18.5 9C18.5 9.82843 17.8284 10.5 17 10.5C16.1716 10.5 15.5 9.82843 15.5 9Z" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>',
    title: "Virtual Filters",
    description:
      "Access a wide range of virtual effects, to create unique music compositions.",
  },
  {
    icon: '<svg fill="#ffffff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g data-name="Layer 2" id="Layer_2"> <path d="M18,11a1,1,0,0,1-1,1,5,5,0,0,0-5,5,1,1,0,0,1-2,0,5,5,0,0,0-5-5,1,1,0,0,1,0-2,5,5,0,0,0,5-5,1,1,0,0,1,2,0,5,5,0,0,0,5,5A1,1,0,0,1,18,11Z"></path> <path d="M19,24a1,1,0,0,1-1,1,2,2,0,0,0-2,2,1,1,0,0,1-2,0,2,2,0,0,0-2-2,1,1,0,0,1,0-2,2,2,0,0,0,2-2,1,1,0,0,1,2,0,2,2,0,0,0,2,2A1,1,0,0,1,19,24Z"></path> <path d="M28,17a1,1,0,0,1-1,1,4,4,0,0,0-4,4,1,1,0,0,1-2,0,4,4,0,0,0-4-4,1,1,0,0,1,0-2,4,4,0,0,0,4-4,1,1,0,0,1,2,0,4,4,0,0,0,4,4A1,1,0,0,1,28,17Z"></path> </g> </g></svg>',
    title: "Real-Time Effects",
    description:
      "Apply real-time audio effects such as reverb, delay, distortion, and filters to your music tracks, and hear the changes instantly as you mix.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features grid grid-cols-3  gap-4 py-8 rounded-lg">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`feature has-medium-padding grid grid-cols-2 ${
            index % 2 === 0 ? " bg-purple-900" : "bg-[#430877]"
          } rounded-lg shadow-md`}
        >
          <figure className="feature__icon flex items-center justify-center">
            <span
              dangerouslySetInnerHTML={{ __html: feature.icon }}
              className="has-observed w-3/5"
            />
          </figure>
          <div className="feature__container p-4">
            <h3 className="feature__title text-lg font-bold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="feature__description text-gray-300">
              {feature.description}
            </p>
            {feature.note && (
              <p
                className="feature__description mt-2 text-gray-300"
                dangerouslySetInnerHTML={{ __html: feature.note }}
              ></p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
