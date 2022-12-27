import React from "react";

export default function useTest() {
  const permissionDescriptors = [{ name: "camera" }, { name: "microphone" }];

  React.useEffect(async () => {
    const permissions = await Promise.all(
      permissionDescriptors.map(async (descriptor) => ({
        descriptor,
        status: await navigator.permissions.query(descriptor),
      }))
    );

    for (const { descriptor, status } of permissions) {
      console.log(
        descriptor.name, // 'camera' | 'microphone'
        status.state // 'granted' | 'denied' | 'prompt'
      );
    }
  }, []);

  return { some: "nothing" };
}
