import { z } from "zod"
import { distance } from "../units"
import { layer_ref } from "./properties/layer_ref"

export const pcb_trace = z.object({
  type: z.literal("pcb_trace"),
  source_trace_id: z.string().optional(),
  pcb_component_id: z.string().optional(),
  pcb_trace_id: z.string(),
  route_thickness_mode: z
    .enum(["constant", "interpolated"])
    .default("constant")
    .optional(),
  should_round_corners: z.boolean().optional(),
  route: z.array(
    z.union([
      z.object({
        route_type: z.literal("wire"),
        x: distance,
        y: distance,
        width: distance,
        start_pcb_port_id: z.string().optional(),
        end_pcb_port_id: z.string().optional(),
        layer: layer_ref,
      }),
      z.object({
        route_type: z.literal("via"),
        x: distance,
        y: distance,
        from_layer: z.string(),
        to_layer: z.string(),
      }),
    ]),
  ),
})

export type PCBTraceInput = z.input<typeof pcb_trace>
export type PCBTrace = z.output<typeof pcb_trace>
