"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const robot_1 = require("./robot");
const resolvers = {
    Query: {
        robot: robot_1.robot
    }
};
exports.resolvers = resolvers;
