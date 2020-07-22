import { AgentSign } from './agentSign';

/**
 * Agent data
 */
export interface AgentData {
  /**
   * Agent signs
   */
  AgentSign?: AgentSign;

  /**
   * Operation name
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT)
   */
  OperationName?: string;

  /**
   * Pay agent phones
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT || PAYING_AGENT || PAYING_SUBAGENT)
   */
  Phones?: string[];

  /**
   * Phones of the payment acceptance operator
   * Required if AgentSing === (PAYING_AGENT || PAYING_SUBAGENT)
   */
  ReceiverPhones?: string[];

  /**
   * Phones of the transfer operator
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT)
   */
  TransferPhones?: string[];

  /**
   * Operator name
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT)
   */
  OperatorName?: string;

  /**
   * Operator address
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT)
   */
  OperatorAddress?: string;

  /**
   * INN of operator
   * Required if AgentSing === (BANK_PAYING_AGENT || BANK_PAYING_SUBAGENT)
   */
  OperatorInn?: string;
}
