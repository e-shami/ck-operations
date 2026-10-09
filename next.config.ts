import type { NextConfig } from "next";
import { getContactEnv } from "./src/lib/env.ts";

getContactEnv();

const config: NextConfig = {};
export default config;
