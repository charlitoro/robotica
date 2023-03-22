"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, apollo_server_express_1.gql) `
    type Coordinate {
        x: Float! y: Float! z: Float!
    }

    type Angles {
        t0: Float! t1: Float! t2: Float! t3: Float! t4: Float! t5: Float!
    }

    input AnglesInput {
        t0: Float! t1: Float! t2: Float! t3: Float! t4: Float! t5: Float!
    }

    type Distances {
        k: Float! l: Float! m: Float! n: Float!
    }

    input DistancesInput {
        k: Float! l: Float! m: Float! n: Float!
    }

    type Kinematic {
        coordinate: Coordinate!
        mth: [[Float!]]
        angles: Angles!
    }

    input RobotInput {
        distances: DistancesInput!
        angles: AnglesInput!
    }

    type Query {
        robot(robot: RobotInput!): Kinematic!
    }
`;
exports.schema = schema;
