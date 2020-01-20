const id = "application";

export const getMountPoint = (): Element => {
  const existingMountPoint = document.querySelector(`#${id}`);

  if (existingMountPoint) {
    return existingMountPoint;
  }

  const mountPoint = document.createElement("div");

  mountPoint.id = id;

  document.body.prepend(mountPoint);

  return mountPoint;
};
