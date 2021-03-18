import { gql } from "apollo-server-express";

const schema: any = gql`
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
`

export { schema }