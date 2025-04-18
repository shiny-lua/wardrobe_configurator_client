import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { RoundedBoxGeometry } from "three-stdlib"
import { drawer } from "@material-tailwind/react"

extend({ RoundedBoxGeometry })

// global config

const Config = {
  init: {
    elementsCount: 4,
    shelfCount: 4,
  },
  plate: {
    width: 200,
    height: 240,
    depth: 60,
    minWidth: 30,
    maxWidth: 800,
    minHeight: 30,
    maxHeight: 275,
    minDepth: 25,
    maxDepth: 80,
    maxDoorLength: 60,
    minDoorLength: 25,
    maxDoubleDoorLength: 120,
    minDoubleDoorLength: 60,
    thickness: 1.9,
    plinthHeight: 8,
    plinthIncident: 1,
    plinthMaxWidth: 274,
    backIncident: 1,
    backThickness: 0.8,
    backOverlapping: 0.5,
    radius: 0.1,
    bevel: 4,
    material: new THREE.MeshStandardMaterial(),
    type: {
      side: "side",
      floor: "floor",
      back: "back",
      plinth: "plinth",
    },
  },
  dimension: {
    material: new THREE.LineBasicMaterial({
      color: "#000000",
      linewidth: 10,
    }),
  },
  baseType: {
    gliders: "gliders",
    panel: "panel",
  },
  glider: {
    height: 2,
    radius: 2.5,
    material: new THREE.MeshPhysicalMaterial({ color: "black" }),
  },
  cutout: {
    depth: 2.5,
    minDepth: 0.9,
    maxDepth: 3.4,
    height: 4,
    minHeight: 2,
    maxHeight: 8,
  },
  fittingType: {
    all: "all",
    left: "left",
    right: "right",
    top: "top",
  },
  korpusType: {
    empty: "Wardrobe",
    outerShap: "outerShap",
    topShap: "topShap",
    uShap: "uShap",
    innerShap: "innerShap",
    innerShap2: "innerShap2"
  },
  furnishing: {
    type: {
      shelf: "Shelf",
      foldBottom: "Fold Bottom",
      glassBottom: "Glass Bottom",
      drawer: "Drawer",
      internalDrawer: "Internal Drawer",
      clothesRail: "Clothes Rail Height Adjustable",
      clothesLift: "Clothes Lift",
      pantsPullout: "Pants Pull-out",
      ledLighting: "Led Lighting",
      slopingFloor: "Sloping Floor",
      divider: "Divider Page",
      door: "Door",
      flap: "Flap"
    },
    default: {
      raster: 1,
      interval: 10,
      spaceSides: 0.1,
      spaceFront: 0.5,
      elementWidth: 46.3,
      elementHeight: 220,
      frontInterval: 0.15,
      shelfOverlapping: 0.8,
      hoverMaterial: new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0,
      }),
      handleIndex: 0,
      handleDirection: "H"
    },
    shelf: {
      raster: 3.2,
      interval: 16,
      thickness1: 1.9,
      thickness2: 2.5,
      minWidth: 15,
      maxWidth: 120,
      minDepth: 30,
      maxDepth: 120,
      material: new THREE.MeshPhysicalMaterial(),
    },
    glassBottom: {
      raster: 3.2,
      thickness: 0.5,
      material: new THREE.MeshPhysicalMaterial({
        color: 0x6f5c56,
        transparent: true,
        opacity: 0.5,
      }),
    },
    foldBottom: {
      minWidth: 15,
      maxWidth: 120,
      minDepth: 30,
      maxDepth: 120,
      thickness1: 1.9,
      thickness2: 2.5,
    },
    drawer: {
      backSpace: 1,
      thickness: 1.6,
      sideIncident: 0.5,
      bottomOverlapping: 0.8,
      bottomIncident: 1.2,
      bottomShelfDistance: 1.6,
      topShelfDistance: 0.7,
      frontThickness: 1.9,
      bodyFrontIncident: 0.2,
      backHeightDifference: 0.2,
      depthRange: [26, 31, 36, 41, 46, 51, 56, 61, 66],
      defaultDepth: 56,
      defaultWidth: 55.2,
      defaultHeight: [8, 16, 24, 14],
      heightInterval: 0.3,
      material: new THREE.MeshPhysicalMaterial(),
      type: {
        drawer8: "drawer8",
        drawer16: "drawer16",
        drawer24: "drawer24",
        customDrawer: "custom"
      }
    },
    internalDrawer: {
      panelWidth: 3.8,
      panelSpace: 0.85,
      bottomShelfDistance: 1.25,
      topShelfDistance: 2.5,
      frontInnerSpace: 7,
      frontSpace: 0.3,
    },
    clothesRail: {
      defaultWidth: 47.6,
      defaultHeight: 3,
      defaultDepth: 1.5,
      widthDelta: 0.3,
      posYDelta: 1.9,
      topSpace: 5.5,
      availableSpace: 80,
    },
    clothesLift: {
      defaultWidth: 52.2,
      defaultHeight: 2.4,
      defaultDepth: 1.2,
      widthDelta: 0.3,
      leftYDelta: -82.5,
      handleYDelta: -75.5,
      handleZDelta: 2.3,
      railWidthDiff: 15,
      topSpace: 4,
      availableSpace: 105,
      availableDepth: 50,
    },
    pantsPullout: {
      availableDepth: 48,
      depthDiff: 5,
      pulloutDepth: 47.4,
      availableSpace: 50,
    },
    ledLighting: {
      frontInnerSpace: 6,
      defaultDepth: 1,
      defaultWidth: 0.1,
      material: new THREE.MeshPhysicalMaterial({
        color: "white",
        emissive: "white",
        emissiveIntensity: 3,
      }),
    },
    slopingFloor: {
      defaultWidth: 47.6,
      defaultHeight: 80,
      availableDepth: 50,
      zIncident: 1,
      angle: Math.PI / 6,
      wallHeight: 7,
      thickness: 1.9,
    },
    divider: {
      minWidth: 15,
      thickness: 1.9,
      defaultHeight: 200,
    },
  },
  door: {
    type: {
      revolving_left: "revolving_left_door",
      revolving_right: "revolving_right_door",
      revolving_double: "revolving_double_door",
      mirror_left: "mirror_left_door",
      mirror_right: "mirror_right_door",
      mirror_double: "mirror_double_door",
      sliding_double: "sliding_double_door",
      sliding_triple: "sliding_triple_door",
      flap_down: "flap_down",
      flap_up: "flap_up"
    },
    category: {
      standard: "standard",
      mirror: "mirror",
      sliding: "sliding",
    },
    mirror_thickness: 0.5,
    defaultHeight: 200,
    defaultWidth: 50,
    defaultFlapWidth: 50,
    defaultFlapHeight: 45,
    material: new THREE.MeshPhysicalMaterial({
      color: "red",
      transparent: true,
      opacity: 0.5,
    }),
    left_type_range: {
      min: 15,
      max: 60,
    },
    double_type_range: {
      min: 30,
      max: 120,
    },
    flap_width_range: {
      min: 26,
      max: 75
    },
    min_height: 30,
    flap_height_range: {
      min: 20,
      max: 50
    }
  },
  griff: {
    scale: {
      width: 0.2,
      height: 0.2,
      depth: 0.2
    }
  },
  view: {
    front: "front",
    dimension: "dimension",
    around: "around",
  },
  color: {
    color: {
      type0: "type0",
      type1: "type1",
      type2: "type2",
      type3: "type3",
      type4: "type4",
      type5: "type5",
      type6: "type6",
      type7: "type7",
      type8: "type8",
      type9: "type9",
      type10: "type10",
      type11: "type11",
      type12: "type12",
    },
    venner: {
      type0: "type0"
    },
    wood: {
      type0: {
        map:  `/images/configurator/textures/wood/wtype0.jpg`,
        normalMap:  `/images/configurator/textures/wood/wtype0_normal.png`,
        aoMap:  `/images/configurator/textures/wood/wtype0_arm.jpg`,
        metalnessMap:  `/images/configurator/textures/wood/wtype0_metal.jpg`,
        roughnessMap:  `/images/configurator/textures/wood/wtype0_rough.jpg`
      },
      type1: "wtype1",
      type2: "wtype2",
      type3: "wtype3",
      type4: "wtype4",
      type5: "wtype5",
      type6: "wtype6",
      type7: "wtype7",
      type8: "wtype8",
    },
    special: {
      type0: "stype0",
      type1: "stype1",
      type2: "stype2",
      type3: "stype3",
      type4: "stype4",
    },
    type: {
      color: "color",
      venner: "venner",
      wood: "wood",
      special: "special",
    },
    category: {
      body: "body",
      front: "front",
    },
  },
  elementIndex: {
    first: "first",
    middle: "middle",
    last: "last",
  },
  material: {
    floor: {
      aoMapIntensity: 3.5,
      normalScale: [1.25, 1.25],
      ior: 1.26,
      roughness: 0.75,
      metalness: 0.125,
      specularIntensity: 0.05,
      envMapIntensity: 0.005,
    },
    wall_back: {
      aoMapIntensity: 1.5,
      normalScale: [1.45, 1.45],
      ior: 1.26,
      roughness: 0.65,
      metalness: 0.005,
      specularIntensity: 0.5,
      envMapIntensity: 0.5,
    },
    wall_left: {
      aoMapIntensity: 3.5,
      normalScale: [1.25, 1.25],
      ior: 1.26,
      roughness: 0.75,
      metalness: 0.125,
      specularIntensity: 0.05,
      envMapIntensity: 0.005,
    },
    wall_right: {
      aoMapIntensity: 3.5,
      normalScale: [1.25, 1.25],
      ior: 1.26,
      roughness: 0.75,
      metalness: 0.125,
      specularIntensity: 0.05,
      envMapIntensity: 0.005,
    },
    type0: {
      aoMapIntensity: 1.65,
      normalScale: [0.45, 0.45],
      ior: 1.46,
      roughness: 1.35,
      metalness: 0.005,
      reflectivity: 0.005,
      specularIntensity: 0.25,
      envMapIntensity: 0.5,
    },
    wtype0: {
      aoMapIntensity: 1.65,
      normalScale: [0.45, 0.45],
      ior: 1.46,
      roughness: 1.35,
      metalness: 0.005,
      reflectivity: 0.005,
      specularIntensity: 0.25,
      envMapIntensity: 0.5,
      clearcoat: 0.00,
      emissiveIntensity: 0.5,
    },
    wtype1: {
      aoMapIntensity: 1.65,
      normalScale: [0.45, 0.45],
      ior: 1.46,
      roughness: 1.35,
      metalness: 0.005,
      reflectivity: 0.005,
      specularIntensity: 0.25,
      envMapIntensity: 0.5,
    },
    wtype2: {
      aoMapIntensity: 1.65,
      normalScale: [0.45, 0.45],
      ior: 1.46,
      roughness: 1.35,
      metalness: 0.005,
      reflectivity: 0.005,
      specularIntensity: 0.25,
      envMapIntensity: 0.5,
    },
    wtype3: {
      aoMapIntensity: 1.65,
      normalScale: [0.45, 0.45],
      ior: 1.46,
      roughness: 1.35,
      metalness: 0.005,
      reflectivity: 0.005,
      specularIntensity: 0.25,
      envMapIntensity: 0.5,
    },
  },
  initialTexture: {
    bodyInfo: {
      name: "Farb-Dekorplatte Back",
      thickness: 19,
      surface: "Matt",
      coating: "Melaminbeschisjd",
      thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
      description: "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt."
    },
    frontInfo: {
      name: "Farb-Dekorplatte Back",
      thickness: 19,
      surface: "Matt",
      coating: "Melaminbeschisjd",
      thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
      description: "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt."
    },
    drawerInfo: {
      name: "Kristallweib",
      thickness: 16,
      surface: "Matt",
      coating: "Metaminbeschichtet",
      weight: 32,
      thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
      description: "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt."
    }
  }
}

export default Config
