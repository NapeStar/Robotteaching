import { Robotmethod } from './robotmethod';

export const ROBOTMETHODS: Robotmethod[] = [
  { id: 11, name: 'trigger_move_base' },
  { id: 12, name: 'trigger_move_arm_cartesian' },
  { id: 13, name: 'trigger_move_arm_joints' },
  { id: 14, name: 'trigger_move_arm_on_trajectory' },
  { id: 15, name: 'trigger_gripper_grip' },
  { id: 16, name: 'trigger_gripper_release' },
  { id: 17, name: 'cancel_workflow' },
  { id: 18, name: 'get_workflow_progress' },
  { id: 19, name: 'get_available_workflows' },
  { id: 20, name: 'get_service_description' }
];
