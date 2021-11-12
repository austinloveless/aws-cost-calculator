import { buildSchema } from "graphql";

export const ec2TypeDefs = buildSchema(`
  scalar Json

  type Query {
    ec2IntanceCost(input: EC2InstanceCostInput!): Json!
  }

  input EC2InstanceCostInput {
    instanceType: InstanceTypes!
    region: Regions!
  }

  enum Regions {
    US_GOV_WEST_1
    AP_SOUTH_1
    AP_NORTHEAST_3
    AP_NORTHEAST_2
    AP_SOUTHEAST_1
    AP_SOUTHEAST_2
    AP_NORTHEAST_1
    CA_CENTRAL_1
    EU_CENTRAL_1
    EU_WEST_1
    EU_WEST_2
    EU_WEST_3
    SA_EAST_1
    US_EAST_1
    US_EAST_2
    US_WEST_1
    US_WEST_2
  }

  enum InstanceTypes {
    C6I_4XLARGE
    C6I_8XLARGE
    C6I_LARGE
    C6I_XLARGE
    C6I
    CC2_8XLARGE
    CR1_8XLARGE
    D2_2XLARGE
    D2_4XLARGE
    D2_8XLARGE
    D2_XLARGE
    D2
    D3_2XLARGE
    D3_4XLARGE
    D3_8XLARGE
    D3_XLARGE
    D3EN_12XLARGE
    D3EN_2XLARGE
    D3EN_4XLARGE
    D3EN_6XLARGE
    D3EN_8XLARGE
    D3EN_XLARGE
    DL1_24XLARGE
    DL1
    F1_16XLARGE
    F1_2XLARGE
    F1_4XLARGE
    F1
    G2_2XLARGE
    G2_8XLARGE
    G2
    G3_16XLARGE
    G3_4XLARGE
    G3_8XLARGE
    G3
    G3S_XLARGE
    G4AD_16XLARGE
    G4AD_2XLARGE
    G4AD_4XLARGE
    G4AD_8XLARGE
    G4AD_XLARGE
    G4AD
    G4DN_12XLARGE
    G4DN_16XLARGE
    G4DN_2XLARGE
    G4DN_4XLARGE
    G4DN_8XLARGE
    G4DN_METAL
    G4DN_XLARGE
    G4DN
    H1_16XLARGE
    H1_2XLARGE
    H1_4XLARGE
    H1_8XLARGE
    H1
    HS1_8XLARGE
    I2_2XLARGE
    I2_4XLARGE
    I2_8XLARGE
    I2_LARGE
    I2_XLARGE
    I2
    I3_16XLARGE
    I3_2XLARGE
    I3_4XLARGE
    I3_8XLARGE
    I3_LARGE
    I3_METAL
    I3_XLARGE
    I3
    I3EN_12XLARGE
    I3EN_24XLARGE
    I3EN_2XLARGE
    I3EN_3XLARGE
    I3EN_6XLARGE
    I3EN_LARGE
    I3EN_METAL
    I3EN_XLARGE
    I3EN
    I3P_16XLARGE
    INF1_24XLARGE
    INF1_2XLARGE
    INF1_6XLARGE
    INF1_XLARGE
    INF1
    M1_LARGE
    M1_MEDIUM
    M1_SMALL
    M1_XLARGE
    M2_2XLARGE
    M2_4XLARGE
    M2_XLARGE
    M3_2XLARGE
    M3_LARGE
    M3_MEDIUM
    M3_XLARGE
    M3
    M4_10XLARGE
    M4_16XLARGE
    M4_2XLARGE
    A1_2XLARGE
    A1_4XLARGE
    A1_LARGE
    A1_MEDIUM
    A1_METAL
    A1_XLARGE
    A1
    C1_MEDIUM
    C1_XLARGE
    C3_2XLARGE
    C3_4XLARGE
    C3_8XLARGE
    C3_LARGE
    C3_XLARGE
    C3
    C4_2XLARGE
    C4_4XLARGE
    C4_8XLARGE
    C4_LARGE
    C4_XLARGE
    C4
    C5_12XLARGE
    C5_18XLARGE
    C5_24XLARGE
    C5_2XLARGE
    C5_4XLARGE
    C5_9XLARGE
    C5_LARGE
    C5_METAL
    C5_XLARGE
    C5
    C5A_12XLARGE
    C5A_16XLARGE
    C5A_24XLARGE
    C5A_2XLARGE
    C5A_4XLARGE
    C5A_8XLARGE
    C5A_LARGE
    C5A_XLARGE
    C5AD_12XLARGE
    C5AD_16XLARGE
    C5AD_24XLARGE
    C5AD_2XLARGE
    C5AD_4XLARGE
    C5AD_8XLARGE
    C5AD_LARGE
    C5AD_XLARGE
    C5D_12XLARGE
    C5D_18XLARGE
    C5D_24XLARGE
    C5D_2XLARGE
    C5D_4XLARGE
    C5D_9XLARGE
    C5D_LARGE
    C5D_METAL
    C5D_XLARGE
    C5D
    C5N_18XLARGE
    C5N_2XLARGE
    C5N_4XLARGE
    C5N_9XLARGE
    C5N_LARGE
    C5N_METAL
    C5N_XLARGE
    C5N
    C6G_12XLARGE
    C6G_16XLARGE
    C6G_2XLARGE
    C6G_4XLARGE
    C6G_8XLARGE
    C6G_LARGE
    C6G_MEDIUM
    C6G_METAL
    C6G_XLARGE
    C6G
    C6GD_12XLARGE
    C6GD_16XLARGE
    C6GD_2XLARGE
    C6GD_4XLARGE
    C6GD_8XLARGE
    C6GD_LARGE
    C6GD_MEDIUM
    C6GD_METAL
    C6GD_XLARGE
    C6GD
    C6GN_12XLARGE
    C6GN_16XLARGE
    C6GN_2XLARGE
    C6GN_4XLARGE
    C6GN_8XLARGE
    C6GN_LARGE
    C6GN_MEDIUM
    C6GN_METAL
    C6GN_XLARGE
    C6GN
    C6I_12XLARGE
    C6I_16XLARGE
    C6I_24XLARGE
    C6I_2XLARGE
    C6I_32XLARGE
    M4_4XLARGE
    M4_LARGE
    M4_XLARGE
    M4
    M5_12XLARGE
    M5_16XLARGE
    M5_24XLARGE
    M5_2XLARGE
    M5_4XLARGE
    M5_8XLARGE
    M5_LARGE
    M5_METAL
    M5_XLARGE
    M5
    M5A_12XLARGE
    M5A_16XLARGE
    M5A_24XLARGE
    M5A_2XLARGE
    M5A_4XLARGE
    M5A_8XLARGE
    M5A_LARGE
    M5A_XLARGE
    M5AD_12XLARGE
    M5AD_16XLARGE
    M5AD_24XLARGE
    M5AD_2XLARGE
    M5AD_4XLARGE
    M5AD_8XLARGE
    M5AD_LARGE
    M5AD_XLARGE
    M5D_12XLARGE
    M5D_16XLARGE
    M5D_24XLARGE
    M5D_2XLARGE
    M5D_4XLARGE
    M5D_8XLARGE
    M5D_LARGE
    M5D_METAL
    M5D_XLARGE
    M5D
    M5DN_12XLARGE
    M5DN_16XLARGE
    M5DN_24XLARGE
    M5DN_2XLARGE
    M5DN_4XLARGE
    M5DN_8XLARGE
    M5DN_LARGE
    M5DN_METAL
    M5DN_XLARGE
    M5DN
    M5N_12XLARGE
    M5N_16XLARGE
    M5N_24XLARGE
    M5N_2XLARGE
    M5N_4XLARGE
    M5N_8XLARGE
    M5N_LARGE
    M5N_METAL
    M5N_XLARGE
    M5N
    M5ZN_12XLARGE
    M5ZN_2XLARGE
    M5ZN_3XLARGE
    M5ZN_6XLARGE
    M5ZN_LARGE
    M5ZN_METAL
    M5ZN_XLARGE
    M5ZN
    M6G_12XLARGE
    M6G_16XLARGE
    M6G_2XLARGE
    M6G_4XLARGE
    M6G_8XLARGE
    M6G_LARGE
    M6G_MEDIUM
    M6G_METAL
    M6G_XLARGE
    M6G
    M6GD_12XLARGE
    M6GD_16XLARGE
    M6GD_2XLARGE
    M6GD_4XLARGE
    M6GD_8XLARGE
    M6GD_LARGE
    M6GD_MEDIUM
    M6GD_METAL
    M6GD_XLARGE
    M6GD
    M6I_12XLARGE
    M6I_16XLARGE
    M6I_24XLARGE
    M6I_2XLARGE
    M6I_32XLARGE
    M6I_4XLARGE
    M6I_8XLARGE
    M6I_LARGE
    M6I_XLARGE
    M6I
    MAC1_METAL
    MAC1
    P2_16XLARGE
    P2_8XLARGE
    P2_XLARGE
    P2
    P3_16XLARGE
    P3_2XLARGE
    P3_8XLARGE
    P3
    P3DN_24XLARGE
    P3DN
    P4D_24XLARGE
    P4D
    R3_2XLARGE
    R3_4XLARGE
    R3_8XLARGE
    R3_LARGE
    R3_XLARGE
    R3
    R4_16XLARGE
    R4_2XLARGE
    R4_4XLARGE
    R4_8XLARGE
    R4_LARGE
    R4_XLARGE
    R4
    R5_12XLARGE
    R5_16XLARGE
    R5_24XLARGE
    R5_2XLARGE
    R5_4XLARGE
    R5_8XLARGE
    R5_LARGE
    R5_METAL
    R5_XLARGE
    R5
    R5A_12XLARGE
    R5A_16XLARGE
    R5A_24XLARGE
    R5A_2XLARGE
    R5A_4XLARGE
    R5A_8XLARGE
    R5A_LARGE
    R5A_XLARGE
    R5AD_12XLARGE
    R5AD_16XLARGE
    R5AD_24XLARGE
    R5AD_2XLARGE
    R5AD_4XLARGE
    R5AD_8XLARGE
    R5AD_LARGE
    R5AD_XLARGE
    R5B_12XLARGE
    R5B_16XLARGE
    R5B_24XLARGE
    R5B_2XLARGE
    R5B_4XLARGE
    R5B_8XLARGE
    R5B_LARGE
    R5B_METAL
    R5B_XLARGE
    R5B
    R5D_12XLARGE
    R5D_16XLARGE
    R5D_24XLARGE
    R5D_2XLARGE
    R5D_4XLARGE
    R5D_8XLARGE
    R5D_LARGE
    R5D_METAL
    R5D_XLARGE
    R5D
    R5DN_12XLARGE
    R5DN_16XLARGE
    R5DN_24XLARGE
    R5DN_2XLARGE
    R5DN_4XLARGE
    R5DN_8XLARGE
    R5DN_LARGE
    R5DN_METAL
    R5DN_XLARGE
    R5DN
    R5N_12XLARGE
    R5N_16XLARGE
    R5N_24XLARGE
    R5N_2XLARGE
    R5N_4XLARGE
    R5N_8XLARGE
    R5N_LARGE
    R5N_METAL
    R5N_XLARGE
    R5N
    R6G_12XLARGE
    R6G_16XLARGE
    R6G_2XLARGE
    R6G_4XLARGE
    R6G_8XLARGE
    R6G_LARGE
    R6G_MEDIUM
    R6G_METAL
    R6G_XLARGE
    R6G
    R6GD_12XLARGE
    R6GD_16XLARGE
    R6GD_2XLARGE
    R6GD_4XLARGE
    R6GD_8XLARGE
    R6GD_LARGE
    R6GD_MEDIUM
    R6GD_METAL
    R6GD_XLARGE
    R6GD
    T1_MICRO
    T2_2XLARGE
    T2_LARGE
    T2_MEDIUM
    T2_MICRO
    T2_NANO
    T2_SMALL
    T2_XLARGE
    T3_2XLARGE
    T3_LARGE
    T3_MEDIUM
    T3_MICRO
    T3_NANO
    T3_SMALL
    T3_XLARGE
    T3
    T3A_2XLARGE
    T3A_LARGE
    T3A_MEDIUM
    T3A_MICRO
    T3A_NANO
    T3A_SMALL
    T3A_XLARGE
    T4G_LARGE
    T4G_2XLARGE
    T4G_MEDIUM
    T4G_MICRO
    T4G_NANO
    T4G_SMALL
    T4G_XLARGE
    U_12TB1
    U_18TB1_METAL
    U_18TB1
    U_24TB1_METAL
    U_24TB1
    U_12TB1_112XLARGE
    U_6TB1_112XLARGE
    U_6TB1_56XLARGE
    U_6TB1_METAL
    U_6TB1
    U_9TB1_112XLARGE
    U_9TB1_METAL
    U_12TB1_METAL
    U_9TB1
    VT1_24XLARGE
    VT1_3XLARGE
    VT1_6XLARGE
    VT1
    X1_16XLARGE
    X1_32XLARGE
    X1
    X1E_16XLARGE
    X1E_2XLARGE
    X1E_32XLARGE
    X1E_4XLARGE
    X1E_8XLARGE
    X1E_XLARGE
    X1E
    X2GD_12XLARGE
    X2GD_16XLARGE
    X2GD_2XLARGE
    X2GD_4XLARGE
    X2GD_8XLARGE
    X2GD_LARGE
    X2GD_MEDIUM
    X2GD_METAL
    X2GD_XLARGE
    X2GD
    Z1D_12XLARGE
    Z1D_2XLARGE
    Z1D_3XLARGE
    Z1D_6XLARGE
    Z1D_LARGE
    Z1D_METAL
    Z1D_XLARGE
    Z1D
  }
`);
